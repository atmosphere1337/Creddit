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
    //private ?string $rules = null; // just string or maybe array or even external table?
    private ?int $membersOnline = null;
    private ?int $members = null;
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







   public function setMembers(int $newMembers) : void
   {
       $this->members = $newMembers;
   }
   public function setMembersOnline(int $newMembersOnline) : void
   {
       $this->membersOnline = $newMembersOnline;
   }
}
