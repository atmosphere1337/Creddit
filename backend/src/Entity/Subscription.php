<?php

namespace App\Entity;

use App\Repository\SubscriptionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubscriptionRepository::class)]
class Subscription
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?int $type = 1; // 1 for channel, 2 for user
    #[ORM\Column]
    private ?int $initiatorUserId = null;
    #[ORM\Column]
    private ?int $targetId = null;
    public function __construct(int $newType, int $newInitiatorUserId, int $newTargetId)
    {
        $this->type = $newType;
        $this->initiatorUserId = $newInitiatorUserId;
        $this->targetId = $newTargetId;
    }
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getType(): ?int
    {
        return $this->type;
    }
    public function getInitiatorUserId(): ?int
    {
        return $this->initiatorUserId;
    }
    public function getTargetId(): ?int
    {
        return $this->targetId;
    }

}