<?php

namespace App\Service;

use App\Entity\SocialMetrics;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class ProtocolRuleAction
{
    public string $criteria;
    public int $degree;
}

class ProtocolRule
{
    public string $pattern;
    public ProtocolRuleAction $action;

    public function __construct(string $newPattern, string $newCriteria, int $newDegree)
    {
        $this->pattern = $newPattern;
        $this->action = new ProtocolRuleAction();
        $this->action->criteria = $newCriteria;
        $this->action->degree = $newDegree;
    }
}

class TextAnalysis
{

    private static array $buzzWords = [];

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

    static function analyzeText($text): SocialMetrics
    {
        $socialMetrics = new SocialMetrics();
        $result = [];
        $result['left-right'] = [];
        $result['lib-auth'] = [];
        $result['income'] = [];
        $reducer = [];
        foreach (self::$buzzWords as $buzzWord) {
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

    static function calculateEuclideanDistance(User &$user, mixed &$ChannelOrPost): void
    {
        $userIncome = $user->getSocialMetrics()->getIntegratedIncome();
        $userLeftRight = $user->getSocialMetrics()->getIntegratedLeftRight();
        $userLibAuth = $user->getSocialMetrics()->getIntegratedLibAuth();
        $otherIncome = $ChannelOrPost->getSocialMetrics()->getOtherIncome();
        $otherLeftRight = $otherIncome->getSocialMetrics()->getOtherLeftRight();
        $otherLibAuth = $otherIncome->getSocialMetrics()->getOtherLibAuth();
        $answer = ($userIncome - $otherIncome) ** 2;
        $answer += ($userLeftRight - $otherLeftRight) ** 2;
        $answer += ($userLibAuth - $otherLibAuth) ** 2;
        $ChannelOrPost->setEuclideanDistance($answer);
    }

    static function sortThingsOut(array &$ChannelsOrPosts): void
    {
        usort($ChannelsOrPosts, function ($a, $b) {
            $a_ed = $a->getEuclideanDistance();
            $b_ed = $b->getEuclideanDistance();
            if ($a_ed == $b_ed)
                return 0;
            return ($a_ed < $b_ed) ? -1 : 1;
        });
    }

    static function recommendChannels(User &$user, array &$channelsFound, EntityManagerInterface &$em): void
    {
        $userMetrics = $em
            ->getRepository(SocialMetrics::class)
            ->findOneBy(['targetType' => 1, 'targetId' => $user->getId()]);
        $user->setSocialMetrics($userMetrics);
        foreach ($channelsFound as $channel) {
            $channel->setSocialMetrics($em->getRepository(SocialMetrics::class)->findOneBy(['targetId', $channel->getId()]));
            self::calculateEuclideanDistance($user, $channel);
        }
        self::sortThingsOut($channelsFound);
    }

    public function saveStatistics(EntityManagerInterface &$entityManager): void
    {
        $socialMetric = new SocialMetrics();

        $id = null;
        $leftRight = 4;
        $libAuth = 4;
        $income = 4;
        $confidence = 1;
        $targetType = 1;
        $targetId = null;
        $entityManager->persist($socialMetric);
        $entityManager->flush();
    }
}