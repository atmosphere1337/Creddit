<?php

namespace App\Entity;

use App\Repository\SocialMetricsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SocialMetricsRepository::class)]
class SocialMetrics
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    #[ORM\Column]
    private ?int $leftRight = 0;
    #[ORM\Column]
    private ?int $libAuth = 0;
    #[ORM\Column]
    private ?int $income = 0;
    #[ORM\Column]
    private ?int $confidence = 1;

    public function getId(): ?int
    {
        return $this->id;
    }
    private function calculateMetric(int $criteria): ?float
    {
        return ($criteria / $this->confidence) * (1 - 1 / $this->confidence); // metric normalization and confidence factor
    }
    public function getLeftRight(): ?float
    {
        return $this->calculateMetric($this->leftRight);
    }
    public function getLibAuth(): ?float
    {
        return $this->calculateMetric($this->libAuth);
    }
    public function getIncome(): ?float
    {
        return $this->calculateMetric($this->income);
    }
    //---------------------------------------------------------------------------------
    public function changeLeftRight(?int $newLeftRightDelta): void
    {
        $this->leftRight += $newLeftRightDelta;
        $this->confidence++;
    }
    public function changeLibAuth(?float $newLibAuthDelta): void
    {
        $this->libAuth += $newLibAuthDelta;
        $this->confidence++;
    }
    public function changeIncome(?float $newIncomeDelta): void
    {
        $this->income += $newIncomeDelta;
        $this->confidence++;
    }

}
