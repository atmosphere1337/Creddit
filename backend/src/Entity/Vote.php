<?php

namespace App\Entity;

use App\Repository\VoteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VoteRepository::class)]
class Vote
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $initiatorUserId = null;
    #[ORM\Column]
    private ?int $targetId = null;
    #[ORM\Column]
    private ?bool $upDown = false;
    #[ORM\Column]
    private ?int $type = 1; // 1 - Post, 2 - Comment
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getUserId(): ?int
    {
        return $this->id;
    }
    public function getInitiatorUserId(): ?int
    {
        return $this->initiatorUserId;
    }
    public function getTargetId(): ?int
    {
        return $this->targetId;
    }
    public function getUpDown(): ?bool
    {
        return $this->upDown;
    }
    public function getType() :?int
    {
        return $this->type;
    }
}
