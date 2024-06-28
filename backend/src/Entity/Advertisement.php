<?php

namespace App\Entity;

use App\Repository\AdvertisementRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdvertisementRepository::class)]
class Advertisement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?string $pictureLink = null;
    #[ORM\Column]
    private ?string $refLink = null;
    #[ORM\Column]
    private ?bool $visible = true;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getPictureLink(): ?string
    {
        return $this->pictureLink;
    }
    public function getRefLink(): ?string
    {
        return $this->refLink;
    }
    public function getVisible(): ?bool
    {
        return $this->visible;
    }
}
