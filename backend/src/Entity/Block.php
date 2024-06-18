<?php

namespace App\Entity;

use App\Repository\BlockRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BlockRepository::class)]
class Block
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    private ?string $type = "user"; // user or channel or post maybe
    private ?int $initiatorUserId = null;
    private ?int $targetUserId = null;
    private ?int $targetChannelId = null;
    private ?int $targetPostId = null;

    public function getId(): ?int
    {
        return $this->id;
    }
}
