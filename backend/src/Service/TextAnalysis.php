<?php
namespace App\Service;

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
    }

    public function basic($text) {
        foreach ($this->buzzWords as $buzzWord) {
            if (str_contains($text, $buzzWord->pattern))
                return $buzzWord->action->degree;
        }

    }
}