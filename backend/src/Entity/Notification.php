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
    private ?int $targetType = 0; // type 1 - comment for comment

    #[ORM\Column]
    private ?int $targetId = 0;

    #[ORM\Column]
    private ?int $receiverUserId = 0;

    #[ORM\Column]
    private ?int $senderUserId = 0;
    #[ORM\Column]
    private ?bool $read = false;
    private ?Comment $comment = null;

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
    public function getRead() :?bool
    {
        return $this->read;
    }
    public function getComment(): ?Comment
    {
        return $this->comment;
    }
    public function setComment(?Comment $newComment): void
    {
        $this->comment = $newComment;
    }
    public function setRead(bool $newRead): void
    {
        $this->read = $newRead;
    }
    public function __construct(
        int $newTargetType,
        int $newTargetId,
        int $newReceiverUserId,
        int $newSenderUserId,
        bool $newRead,
    )
    {
        $this->targetType = $newTargetType;
        $this->targetId = $newTargetId;
        $this->receiverUserId = $newReceiverUserId;
        $this->senderUserId = $newSenderUserId;
        $this->read = $newRead;
    }
    // targetType, targetId, receiverUserId, senderUserId,
}
