<?php
namespace App\Service;

use App\Entity\SocialMetrics;
use Doctrine\ORM\EntityManagerInterface;

class ProtocolRuleAction {
    public string $criteria;
    public int $degree;
}
class ProtocolRule {
    public string $pattern;
    public ProtocolRuleAction $action;
    public function __construct(string $newPattern, string $newCriteria, int $newDegree) {
        $this->pattern = $newPattern;
        $this->action = new ProtocolRuleAction();
        $this->action->criteria = $newCriteria;
        $this->action->degree = $newDegree;
    }
}
class TextAnalysis {

    private array $buzzWords = [];
    public function __construct()
    {
        $this->buzzWords[] = new ProtocolRule('leftist', 'left-right', 7);
        $this->buzzWords[] = new ProtocolRule('nazi', 'left-right', 1);
        $this->buzzWords[] = new ProtocolRule('liberals', 'lib-auth', 7);
        $this->buzzWords[] = new ProtocolRule('freedom', 'lib-auth', 1);
        $this->buzzWords[] = new ProtocolRule('expensive', 'income', 1);
        $this->buzzWords[] = new ProtocolRule('rich', 'income', 2);
        $this->buzzWords[] = new ProtocolRule('cheap', 'income', 3);
        $this->buzzWords[] = new ProtocolRule('poor', 'income', 6);
    }

    public function analyzeText($text): SocialMetrics {
        $socialMetrics = new SocialMetrics();
        $result = [];
        $result['left-right'] = [];
        $result['lib-auth'] = [];
        $result['income'] = [];
        $reducer = [];
        foreach ($this->buzzWords as $buzzWord) {
            if (str_contains($text, $buzzWord->pattern)) {
                $result[$buzzWord->criteria][] = $buzzWord->degree;
            }
        }
        foreach ($result as $key => $value) {
            $floatedMetric = array_sum($value) / count($value) * (1 - 1 / (1 + count($value)));
            $reducer[$key] = floor($floatedMetric);
        }
        $socialMetrics->setIncome($reducer['income']);
        $socialMetrics->setLeftRight($reducer['left-right']);
        $socialMetrics->setLibAuth($reducer['lib-auth']);
        $socialMetrics->setConfidence(1);
        return $socialMetrics;
    }
    public function saveStatistics(EntityManagerInterface &$entityManager): void {
        $socialMetric = new SocialMetrics();

            $id = null;
            $leftRight = 4; //
            $libAuth = 4; //
            $income = 4; //
            $confidence = 1;
            $targetType = 1;
            $targetId = null;
        $entityManager->persist($socialMetric);
        $entityManager->flush();
    }
}