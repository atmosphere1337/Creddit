<?php

namespace App\Repository;

use App\Entity\Channel;
use App\Entity\Subscription;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Channel>
 */
class ChannelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Channel::class);
    }

    // param type = Array of Channels
    public function retrieveSubscriptionAwareChannels(&$channels, $userId, EntityManagerInterface &$em): void
    {
        foreach ($channels as $channel) {
            $filters = ['initiatorUserId' => $userId, 'targetId' => $channel->getId(), 'type' => 1];
            $isThereASub = $em->getRepository(Subscription::class)->findOneBy($filters);
            if ($isThereASub)
                $channel->setSubscriptionLevel(2);
        }
    }
}
