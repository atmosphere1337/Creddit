<?php

namespace App\Repository;

use App\Entity\SocialMetrics;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SocialMetrics>
 *
 * @method SocialMetrics|null find($id, $lockMode = null, $lockVersion = null)
 * @method SocialMetrics|null findOneBy(array $criteria, array $orderBy = null)
 * @method SocialMetrics[]    findAll()
 * @method SocialMetrics[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SocialMetricsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SocialMetrics::class);
    }

//    /**
//     * @return SocialMetrics[] Returns an array of SocialMetrics objects
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

//    public function findOneBySomeField($value): ?SocialMetrics
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
