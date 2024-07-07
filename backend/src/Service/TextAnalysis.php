<?php
namespace App\Service;

class TextAnalysis {
    private array $buzzWords = [
        [
            'pattern' => 'leftist',
            'action' => [
                'criteria' => 'left-right',
                'degree' => 7,
            ]
        ],
            'pattern' => 'nazi',
            'action' => [
                'criteria' => 'left-right',
                'degree' => 1,
            ]
    ];
    public function basic($text) {
        foreach ($this->buzzWords as $buzzWord) {
            if (str_contains($text, $buzzWord['pattern']))
                return $buzzWord['action']['degree'];
        }

    }
}