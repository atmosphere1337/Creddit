<?php
namespace App\Service;

use App\Entity\User;
use App\Entity\Vote;
use Doctrine\ORM\EntityManagerInterface;

class RatingService {
    private EntityManagerInterface $em;
    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    private function calculateRating(int $targetId, int $targetType) : int {
        $votes = $this->em
            ->getRepository(Vote::class)
            ->findBy(['type' => $targetType, 'targetId' => $targetId]);
        $upVotes = array_filter($votes, fn($v) => $v->getUpDown() == true);
        $downVotes = array_filter($votes, fn($v) => $v->getUpDown() == false);
        return (count($upVotes) - count($downVotes));
    }

    public function calculateCommentRating(int $commentId) : int {
        return $this->calculateRating($commentId, 2);
    }

    public function calculatePostRating(int $postId) : int {
        return $this->calculateRating($postId, 1);
    }

    private function checkIfUserEverVoted(int $targetId, int $targetType, ?User &$user) : int {
        $userSpecificVotes = $user ? $this->em
            ->getRepository(Vote::class)
            ->findBy(['targetId' => $targetId, 'type' => $targetType, 'initiatorUserId' => $user->getId()]) : [];
        if (count($userSpecificVotes) > 0)
            return $userSpecificVotes[0]->getUpDown() ? 1 : 2;
        else
            return 0;
    }
    public function checkIfUserEverVotedOnComment(int $commentId, ?User &$user) : int {
        return $this->checkIfUserEverVoted($commentId, 2,$user);
    }
    public function checkIfUserEverVotedOnPost(int $postId, ?User &$user) : int {
        return $this->checkIfUserEverVoted($postId, 1,$user);
    }

}