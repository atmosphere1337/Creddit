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
    private ?int $leftRight = 4;
    #[ORM\Column]
    private ?int $libAuth = 4;
    #[ORM\Column]
    private ?int $income = 4;
    #[ORM\Column]
    private ?int $confidence = 1;

    #[ORM\Column]
    private ?int $targetType = 1; // 1 for users, 2 for channels, 3 for comments, 4 for posts,
    #[ORM\Column]
    private ?int $targetId = null; //

    public function getEuclideanDistance() {

    }
    public function getId(): ?int
    {
        return $this->id;
    }
    private function calculateIntegratedMetric(int $criteria): ?float
    {
        return ($criteria / $this->confidence - 5) * (1 - 1 / $this->confidence) + 5; // metric normalization and confidence factor
    }
    public function getIntegratedLeftRight(): ?float
    {
        return $this->calculateIntegratedMetric($this->leftRight);
    }
    public function getIntegratedLibAuth(): ?float
    {
        return $this->calculateIntegratedMetric($this->libAuth);
    }
    public function getIntegratedIncome(): ?float

    {
        return $this->calculateIntegratedMetric($this->income);
    }
    public function getConfidence(): ?float
    {
        return $this->confidence;
    }
    public function getTargetType(): ?int
    {
        return $this->targetType;
    }
    public function getTargetId(): ?int
    {
        return $this->targetId;
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
    public function setTargetId(?int $targetId): void
    {
        $this->targetId = $targetId;
    }
    public function setTargetType(?int $targetType): void
    {
        $this->targetType = $targetType;
    }
    public function setLeftRight(?int $newLeftRight): void
    {
        $this->leftRight = $newLeftRight;
    }
    public function setLibAuth(?float $newLibAuth): void
    {
        $this->libAuth = $newLibAuth;
    }
    public function setIncome(float $newIncome): void
    {
        $this->income = $newIncome;
    }
    public function setConfidence(?float $newConfidence): void
    {
        $this->confidence = $newConfidence;
    }
}
