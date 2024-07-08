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

    private array $buzzWords = [
        [
            'pattern' => 'leftist',
            'action' => [
                'criteria' => 'left-right',
                'degree' => 7,
            ]
        ],
        [
            'pattern' => 'nazi',
            'action' => [
                'criteria' => 'left-right',
                'degree' => 1,
            ],
        ],
        [
            'pattern' => 'liberals',
            'action' => [
                'criteria' => 'lib-auth',
                'degree' => 7,
            ],
        ],
        [
            'pattern' => 'freedom',
            'action' => [
                'criteria' => 'lib-auth',
                'degree' => 2,
            ],
        ],
        //new ProtocolRule('leftist', 'left-right', 7),


    ];
    public function basic($text) {
        foreach ($this->buzzWords as $buzzWord) {
            if (str_contains($text, $buzzWord['pattern']))
                return $buzzWord['action']['degree'];
        }

    }
}