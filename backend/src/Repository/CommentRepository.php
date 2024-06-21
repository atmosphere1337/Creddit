<?php

namespace App\Repository;

use App\Entity\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Comment>
 *
 *
 * @method comment|null find($id, $lockmode = null, $lockversion = null)
 * @method comment|null findoneby(array $criteria, array $orderby = null)
 * @method comment[]    findall()
 * @method comment[]    findby(array $criteria, array $orderby = null, $limit = null, $offset = null)
 *
 *
 */
class CommentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }
    public function getAmountOfCommentsOfPost($post_id)
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            SELECT count(*)
            FROM comment
            WHERE post_id = :post_id
        ';
        $resultSet = $conn->executeQuery($sql, ['post_id' => $post_id]);
        return $resultSet->fetchAllAssociative()[0]['count'];
    }
    public function deleteAllCommentsOfPost($post_id) : void
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            DELETE FROM comment
            WHERE post_id = :post_id 
        ';
        $conn->executeQuery($sql, ['post_id' => $post_id]);
    }
}
