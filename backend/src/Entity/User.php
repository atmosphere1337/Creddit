<?php

namespace App\Entity;

use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 120, unique: true)]
    private ?string $username = null;

    #[ORM\Column(type:'datetime')]

    private DateTime $lastVisit;

    #[ORM\Column(length: 700, nullable: true)]

    private ?string $profilePictureUrl = null;
    #[ORM\Column(type:'datetime', nullable: true)]
    private ?DateTime $registerDate = null;

    private ?SocialMetrics $socialMetrics = null;
    private ?int $notCheckedNotificationAmount = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }
    public function getUsername(): ?string {
        return $this->username;
    }
    public function setUsername(string $newUsername): void {
        $this->username = $newUsername;
    }
    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
    public function getLastVisit(): ?DateTime
    {
        return $this->lastVisit;
    }
    public function setLastVisit(DateTime $newLastVisit): void
    {
        $this->lastVisit = $newLastVisit;
    }
    public function getProfilePictureUrl(): ?string
    {
        return $this->profilePictureUrl;
    }
    public function setProfilePictureUrl(string $newProfilePictureUrl): void
    {
        $this->profilePictureUrl = $newProfilePictureUrl;
    }
    public function getNotCheckedNotificationAmount(): ?int
    {
        return $this->notCheckedNotificationAmount;
    }
    public function setNotCheckedNotificationAmount(int $newNotCheckedNotificationAmount): void
    {
        $this->notCheckedNotificationAmount = $newNotCheckedNotificationAmount;
    }
    public function getRegisterDate(): ?DateTime
    {
        return $this->registerDate;
    }
    public function setRegisterDate(DateTime $newRegisterDate): void
    {
        $this->registerDate = $newRegisterDate;
    }
    public function getSocialMetrics(): ?SocialMetrics
    {
        return $this->socialMetrics;
    }
    public function setSocialMetrics(SocialMetrics $newSocialMetrics): void
    {
        $this->socialMetrics = $newSocialMetrics;
    }
}
