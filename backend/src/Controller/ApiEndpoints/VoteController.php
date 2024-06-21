<?php
namespace App\Controller\ApiEndpoints;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Vote;

/*
class VoteController extends AbstractController  {
    #[Route('api/public/vote/{postId}', methods: ['GET'])]
    public function getMany(int $postId, EntityManagerInterface $entityManager) : Response {
        $comments = $entityManager->getRepository(Comment::class)->findBy(['postId' => $postId]);
        foreach ($comments as $comment) {
            $votes = $entityManager
                ->getRepository(Vote::class)
                ->findBy(['type' => 2,'targetId' => $comment->getId()]);
            $upVotes = array_filter($votes, fn($v) => $v->getUpDown() == true);
            $downVotes = array_filter($votes, fn($v) => $v->getUpDown() == false);
            $childrenCommentsFound = $entityManager
                ->getRepository(Comment::class)
                ->findBy(['parentCommentId' => $comment->getId()]);
            $comment->setRating(count($upVotes) - count($downVotes));
            $comment->setAmountOfChildComments(count($childrenCommentsFound));
            $authorOfComment = $entityManager->getRepository(User::class)->find($comment->getUserId());
            $comment->setUsername($authorOfComment->getUsername());
        }
        return $this->json($comments);
    }
}
*/