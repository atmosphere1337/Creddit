<?php

namespace App\Entity;

use App\Repository\PostRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostRepository::class)]
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?string $title = null;
    #[ORM\Column(type: 'text')]
    private ?string $body = null;
    #[ORM\Column]
    private ?int $userId = null;
    #[ORM\Column]
    private ?int $channelId = null;
    #[ORM\Column(type:'datetime')]
    private DateTime $createdAt;
    #[ORM\Column]
    private ?bool $isEdited = false;
    private ?string $channelName = null;
    private ?int $rating = 0;
    private ?int $amountOfComments = 0;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getBody(): ?string
    {
        return $this->body;
    }
    public function getUserId(): ?int
    {
        return $this->userId;
    }
    public function getChannelId(): ?int
    {
        return $this->channelId;
    }
    public function getRating(): ?int
    {
        return $this->rating;
    }
    public function getAmountOfComments(): ?int {
        return $this->amountOfComments;
    }
    public function getTitle() :?string
    {
        return $this->title;
    }
    public function getChannelName() :?string
    {
        return $this->channelName;
    }
    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }
    public function getIsEdited(): ?bool
    {
        return $this->isEdited;
    }







    public function setRating(int $newRating) : void
    {
        $this->rating = $newRating;
    }
    public function setAmountOfComments(int $newAmountOfComments) : void
    {
        $this->amountOfComments = $newAmountOfComments;
    }
    public function setChannelName(string $newChannelName) : void
    {
        $this->channelName = $newChannelName;
    }
    public function setTitle(string $newTitle) : void
    {
        $this->title = $newTitle;
    }
    public function setBody(string $newBody) : void
    {
        $this->body = $newBody;
    }
    public function setUserId(?int $newUserId) : void
    {
        $this->userId = $newUserId;
    }
    public function setChannelId(?int $newChannelId) : void
    {
        $this->channelId = $newChannelId;
    }
    public function setCreatedAt(DateTime $newCreatedAt) : void
    {
        $this->createdAt = $newCreatedAt;
    }
    public function setIsEdited(bool $newIsEdited) : void
    {
        $this->isEdited = $newIsEdited;
    }
}
