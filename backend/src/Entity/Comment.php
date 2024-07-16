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
    private ?string $username = null; // user
    private ?int $hasUserEverVoted = 0; // 0 for "didn't vote", 1 for "upvoted", 2 for "downvoted"
    private ?bool $isOwnedByTheUser = false; // ?
    private ?string $profilePicture = "default"; // user
    private ?Post $post = null;
    private ?User $user = null;
    private ?Comment $comment = null;
    private ?SocialMetrics $socialMetrics = null;
    //----------------------------------------------------------------------------------------------------------------
    public function __construct(array $validatedRequestBodyData, int $userId)
    {
        $this->body = $validatedRequestBodyData['commentBody'];
        $this->postId = $validatedRequestBodyData['postId'];
        $this->parentCommentId = $validatedRequestBodyData['setParentCommentId'];
        $this->createdAt = new DateTime();
        $this->isEdited = false;
        $this->isDeleted = false;
        $this->userId = $userId;
    }

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
    public function getIsOwnedByTheUser(): ?bool
    {
        return $this->isOwnedByTheUser;
    }
    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }
    public function getPost(): ?Post
    {
        return $this->post;
    }
    public function getUser(): ?User
    {
        return $this->user;
    }
    public function getSocialMetrics(): ?SocialMetrics
    {
        return $this->socialMetrics;
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

    public function setIsDeleted(bool $newIsDeleted): void
    {
        $this->isDeleted = $newIsDeleted;
    }
    public function setIsEdited(bool $newIsEdited): void
    {
        $this->isEdited = $newIsEdited;
    }
    public function setHasUserEverVoted(int $newHasUserEverVoted) : void
    {
        $this->hasUserEverVoted = $newHasUserEverVoted;
    }
    public function setIsOwnedByTheUser(bool $newIsOwnedByTheUser): void
    {
        $this->isOwnedByTheUser = $newIsOwnedByTheUser;
    }
    public function setProfilePicture(string $newProfilePicture): void
    {
        $this->profilePicture = $newProfilePicture;
    }
    public function setPost(?Post $newPost): void
    {
        $this->post = $newPost;
    }
    public function setUser(?User $newUser): void
    {
        $this->user = $newUser;
    }
    public function setSocialMetrics(SocialMetrics $newSocialMetrics): void
    {
        $this->socialMetrics = $newSocialMetrics;
    }
}
