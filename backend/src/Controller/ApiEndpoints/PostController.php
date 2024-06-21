<?php

namespace App\Controller\ApiEndpoints;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Channel;
use App\Entity\Post;
use App\Entity\Comment;
use App\Entity\Vote;


class PostController extends AbstractController
{
    #[Route('api/post', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager): Response
    {
        $posts = $entityManager->getRepository(Post::class)->findAll();
        foreach ($posts as $post) {
            $this->fetchPost($post, $entityManager);
        }
        return $this->json($posts);
    }

    #[Route('api/post/{id}', methods: ['GET'])]
    public function getOne(int $id, EntityManagerInterface $entityManager): Response
    {
        $post = $entityManager->getRepository(Post::class)->find($id);
        $this->fetchPost($post, $entityManager);
        return $this->json(
            $post
        );
    }

    #[Route('api/channel/{channelId}/posts', methods: ['GET'])]
    public function getManyForSpecificChannel(int $channelId, EntityManagerInterface $entityManager): Response
    {
        $posts = $entityManager->getRepository(Post::class)->findBy(['channelId' => $channelId]);
        foreach ($posts as $post) {
            $this->fetchPost($post, $entityManager);
        }
        return $this->json($posts);
    }

    #[Route('api/post', methods: ['POST'])]
    public function addOne(Request $request, EntityManagerInterface $entityManager): Response
    {
        $newPost = new Post();
        $newPost->setTitle($request->get('postTitle'));
        $newPost->setBody($request->get('postBody'));
        $newPost->setChannelId($request->get('channelId'));
        $newPost->setUserId(1); /* update it with authenticated user id value */
        $newPost->setCreatedAt(new \DateTime('now'));

        $entityManager->persist($newPost);
        $entityManager->flush();
        return $this->json(["createdPostId" => $newPost->getId()]);
    }

    #[Route('api/post/{id}', methods: ['DELETE'])]
    public function deleteOne(int $id, EntityManagerInterface $entityManager): Response
    {
        $postToDelete = $entityManager->getRepository(Post::class)->find($id);
        $manyCommentsToDelete = $entityManager->getRepository(Comment::class)->findBy(['postId' => $postToDelete->getId()]);
        foreach ($manyCommentsToDelete as $oneCommentToDelete) {
            $entityManager->getRepository(Vote::class)->deleteAllVotesUnderComment($oneCommentToDelete->getId());
            $entityManager->remove($oneCommentToDelete);
        }
        $entityManager->getRepository(Vote::class)->deleteAllVotesUnderPost($id);
        $post = $entityManager->getRepository(Post::class)->find($id);
        $entityManager->remove($post);
        $entityManager->flush();
        return $this->json(["deletedPostId" => $id]);
    }

    public function fetchPost(&$post, EntityManagerInterface &$entityManager): void
    {
        $votes = $entityManager
            ->getRepository(Vote::class)
            ->findBy(['targetId' => $post, 'type' => 1]);
        $upVotes = array_filter($votes, fn($v) => $v->getUpDown() == true);
        $downVotes = array_filter($votes, fn($v) => $v->getUpDown() == false);
        $amountOfCommentsFound = $entityManager
            ->getRepository(Comment::class)
            ->getAmountOfCommentsOfPost($post->getId());
        $channelName = $entityManager
            ->getRepository(Channel::class)
            ->findOneBy(['id' => $post
                ->getChannelId()])
            ->getName();
        $post->setRating(count($upVotes) - count($downVotes));
        $post->setAmountOfComments($amountOfCommentsFound);
        $post->setChannelName($channelName);
    }

}
