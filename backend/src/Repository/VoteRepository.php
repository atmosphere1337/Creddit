<?php

namespace App\Repository;

use App\Entity\Vote;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Vote>
 */
class VoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vote::class);
    }

    public function deleteAllVotesUnderComment(int $commentIdWhoseVotesToBeDeleted) : void
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            DELETE FROM vote
            WHERE type = 2
            AND target_id = :target_id 
         ';
        $conn->executeQuery($sql, ['target_id' => $commentIdWhoseVotesToBeDeleted]);
    }
    public function deleteAllVotesUnderPost(int $postIdWhoseVotesToBeDeleted) : void
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            DELETE FROM vote
            WHERE type = 1
            AND target_id = :target_id 
         ';
        $conn->executeQuery($sql, ['target_id' => $postIdWhoseVotesToBeDeleted]);
    }


}
