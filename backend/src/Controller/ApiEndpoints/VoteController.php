<?php

namespace App\Controller\ApiEndpoints;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Vote;

class VoteController extends AbstractController
{
    // post/comment upvote/downvote
    public const POST_TYPE = 1;
    public const COMMENT_TYPE = 2;
    public const UPVOTE_TYPE = true;
    public const DOWNVOTE_TYPE = false;

    public function setVoteOn(int $targetId, int $PostOrCommentType, bool $UpOrDownType, EntityManagerInterface &$entityManager): int
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $filters = ['targetId' => $targetId, 'initiatorUserId' => $userId, 'type' => $PostOrCommentType];
        $conflictingVotes = $entityManager->getRepository(Vote::class)->findBy($filters);
        if (count($conflictingVotes) > 0) {
            return Response::HTTP_BAD_REQUEST;
        }
        $newVote = new Vote();
        $newVote->setType($PostOrCommentType);
        $newVote->setTargetId($targetId);
        $newVote->setInitiatorUserId($userId);
        $newVote->setUpDown($UpOrDownType);
        $entityManager->persist($newVote);
        $entityManager->flush();
        return Response::HTTP_CREATED;
    }

    public function setVoteOff(int $targetId, int $PostOrCommentType, bool $UpOrDownType, EntityManagerInterface &$entityManager): int
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $filters = ['targetId' => $targetId, 'initiatorUserId' => $userId, 'type' => $PostOrCommentType, 'upDown' => $UpOrDownType];
        $upVotesFound = $entityManager->getRepository(Vote::class)->findBy($filters);
        foreach ($upVotesFound as $singleUpVote) {
            $entityManager->remove($singleUpVote);
        }
        $entityManager->flush();
        return Response::HTTP_NO_CONTENT;
    }

    #[Route('api/post/{postId}/upvote', methods: ['POST'])]
    public function setPostUpvoteOn(int $postId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOn($postId, self::POST_TYPE, self::UPVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

    #[Route('api/post/{postId}/upvote', methods: ['DELETE'])]
    public function setPostUpvoteOff(int $postId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOff($postId, self::POST_TYPE, self::UPVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

    #[Route('api/post/{postId}/downvote', methods: ['POST'])]
    public function setPostDownvoteOn(int $postId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOn($postId, self::POST_TYPE, self::DOWNVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

    #[Route('api/post/{postId}/downvote', methods: ['DELETE'])]
    public function setPostDownvoteOff(int $postId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOff($postId, self::POST_TYPE, self::DOWNVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

//------------------------------------------------------------------------------
    #[Route('api/comment/{commentId}/upvote', methods: ['POST'])]
    public function setCommentUpvoteOn(int $commentId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOn($commentId, self::COMMENT_TYPE, self::UPVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

    #[Route('api/comment/{commentId}/upvote', methods: ['DELETE'])]
    public function setCommentUpvoteOff(int $commentId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOff($commentId, self::COMMENT_TYPE, self::UPVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

    #[Route('api/comment/{commentId}/downvote', methods: ['POST'])]
    public function setCommentDownvoteOn(int $commentId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOn($commentId, self::COMMENT_TYPE, self::DOWNVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }

    #[Route('api/comment/{commentId}/downvote', methods: ['DELETE'])]
    public function setCommentDownvoteOff(int $commentId, EntityManagerInterface $entityManager): Response
    {
        $responseCode = $this->setVoteOff($commentId, self::COMMENT_TYPE, self::DOWNVOTE_TYPE, $entityManager);
        return $this->json([], $responseCode);
    }
}
