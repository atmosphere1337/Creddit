<?php

namespace App\Entity;

use App\Repository\ReportRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReportRepository::class)]
class Report
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    private ?string $type = "user"; // channel user or post
    private ?int $initiatorUserId = null;
    private ?int $targetUserId = null;
    private ?int $targetChannelId = null;
    private ?int $targetPostId = null;
    private ?int $body = null;
    public function getId(): ?int
    {
        return $this->id;
    }
}
