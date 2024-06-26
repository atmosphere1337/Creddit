<?php
namespace App\Controller\ApiEndpoints;

use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
    #[Route('/api/channel/{channelId}', methods: ['GET'])]
    public function getOne(EntityManagerInterface $entityManager, int $channelId) : Response {
        $userId = 1; // imitating authenticated user
        $channel = $entityManager->getRepository(Channel::class)->find($channelId);
        // the performance can be optimized later using raw sql query, e.g. like count(*), so we don't have to retrieve entities themselves
        $membersFound = $entityManager->getRepository(Subscription::class)->findBy(['type' => 1, 'targetId' => $channelId]);
        $numberOfMembersFound = count($membersFound);
        $numberOfMembersOnlineFound = $entityManager
            ->getRepository(Subscription::class)
            ->getNumberOfChannelSubscribersOnline($channelId);
        $subs = $entityManager->getRepository(Subscription::class)->findBy(['type' => 1, 'targetId' => $channelId, 'initiatorUserId' => $userId]);
        $channel->setSubscriptionLevel(count($subs) > 0 ? 2 : 1);
        $channel->setMembers($numberOfMembersFound);
        $channel->setMembersOnline($numberOfMembersOnlineFound);
        return $this->json($channel);
    }
    #[Route('/api/channel', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager) : Response
    {
        $userId = 1; // imitating authenticated user
        $channelsFound = $entityManager->getRepository(Channel::class)->findAll();
        $entityManager->getRepository(Channel::class)
            ->retrieveSubscriptionAwareChannels($channelsFound, $userId, $entityManager);
        return $this->json($channelsFound);
    }
    #[Route('/api/channel', methods: ['POST'])]
    public function addOne(EntityManagerInterface $entityManager, Request $request) : Response
    {
        $newChannel = new Channel($request->get('name'), $request->get('description'));
        $entityManager->persist($newChannel);
        $entityManager->flush();
        return $this->json(['id' => $newChannel->getId()], Response::HTTP_CREATED);
    }
}
