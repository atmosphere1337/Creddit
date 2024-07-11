<?php
namespace App\Service;

use App\Entity\User;
use App\Entity\Vote;
use Doctrine\ORM\EntityManagerInterface;

class RatingService {
    private static function calculateRating(EntityManagerInterface &$em, int $targetId, int $targetType) : int {
        $votes = $em
            ->getRepository(Vote::class)
            ->findBy(['type' => $targetType, 'targetId' => $targetId]);
        $upVotes = array_filter($votes, fn($v) => $v->getUpDown() == true);
        $downVotes = array_filter($votes, fn($v) => $v->getUpDown() == false);
        return (count($upVotes) - count($downVotes));
    }

    public static function calculateCommentRating(EntityManagerInterface &$em, int $commentId) : int {
        return self::calculateRating($em, $commentId, 2);
    }

    public static function calculatePostRating(EntityManagerInterface &$em, int $postId) : int {
        return self::calculateRating($em, $postId, 1);
    }

    private static function checkIfUserEverVoted(EntityManagerInterface &$em, int $targetId, int $targetType, ?User &$user) : int {
        $userSpecificVotes = $user ? $em
            ->getRepository(Vote::class)
            ->findBy(['targetId' => $targetId, 'type' => $targetType, 'initiatorUserId' => $user->getId()]) : [];
        if (count($userSpecificVotes) > 0)
            return $userSpecificVotes[0]->getUpDown() ? 1 : 2;
        else
            return 0;
    }
    public static function checkIfUserEverVotedOnComment(EntityManagerInterface &$em, int $commentId, ?User &$user) : int {
        return self::checkIfUserEverVoted($em, $commentId, 2,$user);
    }
    public static function checkIfUserEverVotedOnPost(EntityManagerInterface &$em, int $postId, ?User &$user) : int {
        return self::checkIfUserEverVoted($em, $postId, 1,$user);
    }

}