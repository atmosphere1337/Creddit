<?php

namespace App\Controller\ApiEndpoints;

use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Comment;
use App\Entity\Vote;
use App\Entity\User;

class CommentController extends AbstractController
{
    #[Route('api/comment/{postId}', methods: ['GET'])]
    public function getMany(int $postId, EntityManagerInterface $entityManager): Response
    {
        $comments = $entityManager->getRepository(Comment::class)->findBy(['postId' => $postId]);
        foreach ($comments as $comment) {
            $votes = $entityManager
                ->getRepository(Vote::class)
                ->findBy(['type' => 2, 'targetId' => $comment->getId()]);
            $upVotes = array_filter($votes, fn($v) => $v->getUpDown() == true);
            $downVotes = array_filter($votes, fn($v) => $v->getUpDown() == false);
            $childrenCommentsFound = $entityManager
                ->getRepository(Comment::class)
                ->findBy(['parentCommentId' => $comment->getId()]);
            /** @var User $user */
            $user = $this->getUser();
            $userId = $user ? $user->getId() : 0;
            $userSpecificVotes = $user ? $entityManager
                ->getRepository(Vote::class)
                ->findBy(['targetId' => $comment->getId(), 'type' => 2, 'initiatorUserId' => $userId]) : [];
            if (count($userSpecificVotes) > 0)
                $comment->setHasUserEverVoted($userSpecificVotes[0]->getUpDown() ? 1 : 2);
            else
                $comment->setHasUserEverVoted(0);
            $comment->setRating(count($upVotes) - count($downVotes));
            $comment->setAmountOfChildComments(count($childrenCommentsFound));
            $authorOfComment = $entityManager->getRepository(User::class)->find($comment->getUserId());
            $comment->setUsername($authorOfComment->getUsername());
        }
        return $this->json($comments);
    }

    #[Route('api/comment', methods: ['POST'])]
    public function addOne(Request $request, EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $newComment = new Comment();
        $newComment->setBody($request->request->get('commentBody'));
        $newComment->setPostId($request->request->get('postId'));
        $newComment->setParentCommentId($request->request->get('setParentCommentId'));
        $newComment->setCreatedAt(new DateTime());
        $newComment->setUserId($userId);
        $entityManager->persist($newComment);
        $entityManager->flush();
        return $this->json(["idOfCreatedComment" => $newComment->getId()]);
    }

    #[Route('api/comment/{id}', methods: ['DELETE'])]
    public function deleteOne(int $id, EntityManagerInterface $entityManager): Response
    {
        $result = ["deletedCommentId" => $id,];
        $deletingComment = $entityManager
            ->getRepository(Comment::class)
            ->find($id);
        $deletingComment->setIsDeleted(true);
        $entityManager
            ->getRepository(Vote::class)
            ->deleteAllVotesUnderComment($id);
        $childrenOfDeletingComment = $entityManager
            ->getRepository(Comment::class)
            ->findBy(['parentCommentId' => $deletingComment->getId()]);
        if (count($childrenOfDeletingComment) > 0) {
            $deletingComment->setIsDeleted(true);
            $entityManager->persist($deletingComment);
            $result["EraseOrMark"] = 1;
        } else {
            $entityManager->remove($deletingComment);
            $result["EraseOrMark"] = 2;
        }
        $entityManager->flush();
        return $this->json($result);
    }
}
