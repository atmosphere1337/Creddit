<?php

namespace App\Repository;

use App\Entity\Subscription;
use DateInterval;
use DateTime;
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

    public function getIdsOfTheMostPopularChannels($range)
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            SELECT target_id, count(*)
            FROM subscription
            WHERE type = 1
            GROUP BY target_id
            ORDER BY count(*) DESC
            LIMIT :range
        ';
        $resultSet = $conn->executeQuery($sql, ['range' => $range]);
        return $resultSet->fetchAllAssociative();
    }

    public function getNumberOfChannelSubscribersOnline(int $channelId)
    {
        $conn = $this->getEntityManager()->getConnection();
        $oneMinuteAgo = new DateTime();
        $oneMinuteAgo->modify('-1 minutes')->format('Y-m-d H:i:s');
        $oneMinuteAgo = date_format($oneMinuteAgo, 'Y-m-d H:i:s');
        $sql = "
            SELECT * 
            FROM \"subscription\" INNER JOIN \"user\"
                ON \"subscription\".initiator_user_id = \"user\".id
            WHERE \"subscription\".type = 1
                AND \"subscription\".target_id = $channelId
                AND \"user\".last_visit > timestamp '$oneMinuteAgo'
        ";
        $resultSet = $conn->executeQuery($sql);
        return count($resultSet->fetchAllAssociative());
    }
}
