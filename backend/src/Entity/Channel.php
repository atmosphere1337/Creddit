<?php

namespace App\Entity;

use App\Repository\ChannelRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
class Channel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?string $name = null;
    #[ORM\Column]
    private ?string $description = null;

    #[ORM\Column(length: 700, nullable: true)]
    private ?string $channelProfilePictureUrl = "default";

    #[ORM\Column(length: 700, nullable: true)]
    private ?string $channelWallpaperPictureUrl = "default";

    private ?SocialMetrics $socialMetrics = null;
    private ?float $euclideanDistance = null;

    private ?int $membersOnline = null;
    private ?int $members = null;
    private ?int $subscriptionLevel = 1; // 1 is for "non-subscriber", 2 is for "subscriber"
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getName(): ?string
    {
        return $this->name;
    }
    public function getDescription(): ?string
    {
        return $this->description;
    }
    public function getMembers(): ?int
    {
        return $this->members;
    }
    public function getMembersOnline(): ?int
    {
        return $this->membersOnline;
    }
    public function getSubscriptionLevel(): ?int
    {
        return $this->subscriptionLevel;
    }
    public function getChannelProfilePictureUrl(): ?string
    {
        return $this->channelProfilePictureUrl;
    }
    public function getChannelWallpaperPictureUrl(): ?string
    {
        return $this->channelWallpaperPictureUrl;
    }
    public function getSocialMetrics(): ?SocialMetrics
    {
        return $this->socialMetrics;
    }
    public function getEuclideanDistance(): ?float
    {
        return $this->euclideanDistance;
    }
//------------------------------------------------------------------------------------------------
    public function __construct(string $newName, $newDescription)
    {
        $this->name = $newName;
        $this->description = $newDescription;
    }
   public function setMembers(int $newMembers) : void
   {
       $this->members = $newMembers;
   }
   public function setMembersOnline(int $newMembersOnline) : void
   {
       $this->membersOnline = $newMembersOnline;
   }
   public function setSubscriptionLevel(int $newSubscriptionLevel) : void
   {
       $this->subscriptionLevel = $newSubscriptionLevel;
   }
   public function setChannelProfilePictureUrl(string $channelProfilePictureUrl) : void
   {
       $this->channelProfilePictureUrl = $channelProfilePictureUrl;
   }
   public function setChannelWallpaperPictureUrl(string $channelWallpaperPictureUrl) : void
   {
       $this->channelWallpaperPictureUrl = $channelWallpaperPictureUrl;
   }
    public function setSocialMetrics(SocialMetrics $newSocialMetrics): void
    {
        $this->socialMetrics = $newSocialMetrics;
    }
    public function setEuclideanDistance(int $newEuclideanDistance) : void
    {
        $this->euclideanDistance = $newEuclideanDistance;
    }
}
