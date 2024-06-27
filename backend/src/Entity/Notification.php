<?php

namespace App\Entity;

use App\Repository\NotificationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotificationRepository::class)]
class Notification
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?int $targetType = 0;

    #[ORM\Column]
    private ?int $targetId = 0;

    #[ORM\Column]
    private ?int $receiverUserId = 0;

    #[ORM\Column]
    private ?int $senderUserId = 0;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getTargetType(): ?int
    {
        return $this->targetType;
    }
    public function getTargetId(): ?int
    {
        return $this->targetId;
    }
    public function getReceiverUserId(): ?int
    {
        return $this->receiverUserId;
    }
    public function getSenderUserId(): ?int
    {
        return $this->senderUserId;
    }
    public function __construct(int $newTargetType, int $newTargetId, int $newReceiverUserId, int $newSenderUserId)
    {
        $this->targetType = $newTargetType;
        $this->targetId = $newTargetId;
        $this->receiverUserId = $newReceiverUserId;
        $this->senderUserId = $newSenderUserId;
    }
    // targetType, targetId, receiverUserId, senderUserId,
}
