<?php

namespace App\Controller\ApiEndpoints;

use App\Entity\Subscription;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

class SubscriptionController extends AbstractController
{
    #[Route('/api/channel/{channelId}/subscribe', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'Returns the rewards of an user',
    )]
    public function channelCreateOne(int $channelId, EntityManagerInterface $entityManager): Response
    {
        $userId = 1; // emulated authenticated user
        $filters = ['targetId' => $channelId, 'type'=> 1, 'initiatorUserId' =>  $userId];
        $subsForSpecificChannelFound = $entityManager->getRepository(Subscription::class)->findBy($filters);
        if (count($subsForSpecificChannelFound) > 0)
            return $this->json([], Response::HTTP_CONFLICT);
        $newSubscription = new Subscription(1, $userId, $channelId);
        $entityManager->persist($newSubscription);
        $entityManager->flush();
        return $this->json([], Response::HTTP_CREATED);
    }
    #[Route('/api/channel/{channelId}/subscribe', methods: ['DELETE'])]
    public function channelDeleteOne(int $channelId, EntityManagerInterface $entityManager): Response
    {
        $userId = 1; // emulated authenticated user
        $filters = ['targetId' => $channelId, 'type'=> 1, 'initiatorUserId' =>  $userId];
        $subsForSpecificChannelFound = $entityManager->getRepository(Subscription::class)->findBy($filters);
        if (count($subsForSpecificChannelFound) == 0)
            return $this->json([], Response::HTTP_NOT_FOUND);
        foreach ($subsForSpecificChannelFound as $subscription)
            $entityManager->remove($subscription);
        $entityManager->flush();
        return $this->json([], Response::HTTP_NO_CONTENT);
    }
}
