<?php
namespace App\Controller\Essentials;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Channel;
use App\Entity\Subscription;

class ChannelController extends AbstractController  {
    #[Route('api/popularchannels', methods: ['GET'])]
    public function getMany(EntityManagerInterface $entityManager) : Response {
        $channels = [];
        $subscriptions = $entityManager->getRepository(Subscription::class)->getIdsOfTheMostPopularChannels(3);
        foreach ($subscriptions as $subscription) {
            $channel = $entityManager->getRepository(Channel::class)->find($subscription['target_id']);
            $channel->setMembers($subscription['count']);
            array_push($channels, $channel);
        }
        return $this->json($channels);
    }
    #[Route('/api/channel/{id}', methods: ['GET'])]
    public function getOne(EntityManagerInterface $entityManager, int $id) : Response {
        $channel = $entityManager->getRepository(Channel::class)->find($id);
        // the performance can be optimized later using raw sql query, e.g. like count(*), so we don't have to retrieve entities themselves
        $membersFound = $entityManager->getRepository(Subscription::class)->findBy(['type' => 1, 'targetId' => $id]);
        $numberOfMembersFound = count($membersFound);
        $numberOfMembersOnlineFound = 777;
        $channel->setMembers($numberOfMembersFound);
        $channel->setMembersOnline($numberOfMembersOnlineFound);
        return $this->json($channel);
    }
}
