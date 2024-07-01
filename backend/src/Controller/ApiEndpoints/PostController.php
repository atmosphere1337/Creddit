<?php

namespace App\Controller\ApiEndpoints;

use App\Entity\User;
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
        return $this->json($post);
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
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $newPost = new Post();
        $newPost->setTitle($request->get('postTitle'));
        $newPost->setBody($request->get('postBody'));
        $newPost->setChannelId($request->get('channelId'));
        $newPost->setUserId($userId);
        $newPost->setCreatedAt(new \DateTime('now'));

        $entityManager->persist($newPost);
        $entityManager->flush();
        return $this->json(["createdPostId" => $newPost->getId()]);
    }

    #[Route('api/post/{id}', methods: ['DELETE'])]
    public function deleteOne(int $id, EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $postToDelete = $entityManager->getRepository(Post::class)->find($id);
        if ($postToDelete->getUserId() !== $user->getId())
            return $this->json([], Response::HTTP_FORBIDDEN);
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
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user ? $user->getId() : 0;
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
        if ($user) {
            $userSpecificVotes = $entityManager
                ->getRepository(Vote::class)
                ->findBy(['targetId' => $post->getId(), 'type' => 1, 'initiatorUserId' => $userId]);
            if (count($userSpecificVotes) > 0)
                $post->setHasUserEverVoted($userSpecificVotes[0]->getUpDown() ? 1 : 2);
            else
                $post->setHasUserEverVoted(0);
            if ($post->getUserId() == $user->getId())
                $post->setIsOwnedByTheUser(true);
        }
        $post->setRating(count($upVotes) - count($downVotes));
        $post->setAmountOfComments($amountOfCommentsFound);
        $post->setChannelName($channelName);
    }

}
