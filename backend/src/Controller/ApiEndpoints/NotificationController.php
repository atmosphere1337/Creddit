<?php

namespace App\Controller\ApiEndpoints;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Notification;
use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\Channel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NotificationController extends AbstractController
{
    #[Route('/api/user/{userId}/notification', methods: ['GET'])]
    public function index(int $userId, EntityManagerInterface $em): Response
    {
        $notificationsFound = $em->getRepository(Notification::class)->findBy(['receiverUserId' => $userId]);
        foreach ($notificationsFound as $notification) {
            if ($notification->getTargetType() == 1) {
                $comment = $em->getRepository(Comment::class)->find($notification->getTargetId());
                $post = $em->getRepository(Post::class)->find($comment->getPostId());
                $channel = $em->getRepository(Channel::class)->find($post->getChannelId());
                $post->setChannel($channel);
                $comment->setPost($post);
                $notification->setComment($comment);
            }
        }

        // $serializer = new Serializer([new ObjectNormalizer()]);
        // $data = $serializer->normalize($notificationsFound, null, [AbstractNormalizer::ATTRIBUTES =>    ])
        return $this->json($notificationsFound);
    }
    #[Route('/api/notification/{notificationId}', methods: ['PUT'])]
    public function setReadTrue(int $notificationId, EntityManagerInterface $em): Response
    {
        $notification = $em->getRepository(Notification::class)->find($notificationId);
        $notification->setRead(true);
        $em->flush();
        return $this->json($notification);
    }
}
