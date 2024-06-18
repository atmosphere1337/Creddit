<?php

namespace App\Repository;

use App\Entity\Subscription;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Subscription>
 *
 * @method subscription|null find($id, $lockmode = null, $lockversion = null)
 * @method subscription|null findoneby(array $criteria, array $orderby = null)
 * @method subscription[]    findall()
 * @method subscription[]    findby(array $criteria, array $orderby = null, $limit = null, $offset = null)
 */
class SubscriptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Subscription::class);
    }
    public function getIdsOfTheMostPopularChannels($range) {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT target_id, count(*)
             FROM subscription
             WHERE type = 1
             GROUP BY target_id
             ORDER BY count(*) DESC
             LIMIT :range';
        $resultSet = $conn->executeQuery($sql, ['range' => $range]);
        return $resultSet->fetchAllAssociative();
    }
//    /**
//     * @return Subscription[] Returns an array of Subscription objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Subscription
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
