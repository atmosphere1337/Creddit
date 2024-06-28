<?php

namespace App\Entity;

use App\Repository\CommentRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column(type: 'text')]
    private ?string $body = null;
    #[ORM\Column]
    private ?int $userId = null;
    #[ORM\Column]
    private ?int $postId = null;
    #[ORM\Column]
    private ?int $parentCommentId = null;
    #[ORM\Column(type: 'datetime')]
    private DateTime $createdAt;
    #[ORM\Column]
    private ?bool $isEdited = false;
    #[ORM\Column(nullable: true)]
    private ?bool $isDeleted = null;
    private ?int $rating = 0;
    private ?int $amountOfChildComments = 0;
    private ?string $username = null;
    private ?int $hasUserEverVoted = 0; // 0 for "didn't vote", 1 for "upvoted", 2 for "downvoted"

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

    public function getPostId(): ?int
    {
        return $this->postId;
    }

    public function getParentCommentId(): ?int
    {
        return $this->parentCommentId;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function getAmountOfChildComments(): ?int
    {
        return $this->amountOfChildComments;
    }

    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    public function getIsEdited(): ?bool
    {
        return $this->isEdited;
    }

    public function getIsDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function getHasUserEverVoted(): ?int
    {
        return $this->hasUserEverVoted;
    }
//------------------------------------------------------------------------------------------------
    public function setRating(int $newRating): void
    {
        $this->rating = $newRating;
    }

    public function setAmountOfChildComments(int $newAmountOfChildComments): void
    {
        $this->amountOfChildComments = $newAmountOfChildComments;
    }

    public function setUsername(string $newUsername): void
    {
        $this->username = $newUsername;
    }

    public function setBody(string $newBody): void
    {
        $this->body = $newBody;
    }

    public function setUserId(?int $newUserId): void
    {
        $this->userId = $newUserId;
    }

    public function setParentCommentId(?int $newParentCommentId): void
    {
        $this->parentCommentId = $newParentCommentId;
    }

    public function setPostId(?int $newPostId): void
    {
        $this->postId = $newPostId;
    }

    public function setCreatedAt(DateTime $newCreatedAt): void
    {
        $this->createdAt = $newCreatedAt;
    }

    public function setIsDeleted(bool $newIsDeleted): void
    {
        $this->isDeleted = $newIsDeleted;
    }

    public function setHasUserEverVoted(int $newHasUserEverVoted) : void
    {
        $this->hasUserEverVoted = $newHasUserEverVoted;
    }

}
