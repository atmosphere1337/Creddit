<?php

namespace App\Controller\Essentials;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    public function getMany(EntityManagerInterface $entityManager): Response
    {
        $posts = $entityManager->getRepository(Post::class)->findAll();
        foreach ($posts as $post) {
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
        return $this->json($posts);
    }

    #[Route('api/post/{id}', methods: ['GET'])]
    public function getOne(int $id, EntityManagerInterface $entityManager): Response
    {
        $post = $entityManager->getRepository(Post::class)->find($id);
        $votes = $entityManager
            ->getRepository(Vote::class)
            ->findBy(['type' => 1, 'targetId' => $post]);
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
        return $this->json(
            $post
        );


    }

    #[Route('kekapi/public/post/{id}', methods: ['GET'])]
    public function getNone()
    {
        return $this->json([
            "id" => 1,
            "body" => "This is body for this article",
            "userId" => 3,
            "channelId" => 4,
            "rating" => 2,
            "amountOfComments" => 3,
            "title" => "Elden ring new dlc when ",
            "channelName" => "React"
        ]);
    }
}
