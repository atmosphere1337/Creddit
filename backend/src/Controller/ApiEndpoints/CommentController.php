<?php

namespace App\Controller\ApiEndpoints;

use App\Service\TextAnalysis;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Comment;
use App\Entity\Vote;
use App\Entity\User;
use App\Entity\Notification;

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
            if ($user && $comment->getUserId() == $user->getId())
                $comment->setIsOwnedByTheUser(true);
            $comment->setRating(count($upVotes) - count($downVotes));
            $comment->setAmountOfChildComments(count($childrenCommentsFound));
            $authorOfComment = $entityManager->getRepository(User::class)->find($comment->getUserId());
            $comment->setUsername($authorOfComment->getUsername());
            $comment->setProfilePicture($authorOfComment->getProfilePictureUrl());
        }
        return $this->json($comments);
    }

    #[Route('api/comment', methods: ['POST'])]
    public function addOne(Request $request, EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        // can you validate postData here already ffs?
        $newComment = new Comment($request->request->all(), $user->getId());
        $entityManager->persist($newComment);
        $entityManager->flush();
        //  notification part start
        if ($newComment->getParentCommentId() > 0) {
            $parentComment     = $entityManager->getRepository(Comment::class)->find($newComment->getParentCommentId());
            $parentCommentUser = $entityManager->getRepository(User::class)->find($parentComment->getUserId());
            $newNotification = new Notification(1, $newComment->getId(), $parentCommentUser->getId(), $user->getId(), false);
            $allNotifications = $entityManager->getRepository(Notification::class)->findBy(['receiverUserId' => $parentCommentUser->getId()]);
            if (count($allNotifications) > 10) {
                $entityManager->remove(end($allNotifications));
                $entityManager->flush();
            }
            $entityManager->persist($newNotification);
            $entityManager->flush();
        }
        // notification part ends

        // analytics gathering
        /*
        $resultMetric = TextAnalysis::analyzeText($newComment->getBody());
        // 1 for users, 2 for channels, 3 for comments, 4 for posts,
        $resultMetric->setTargetType(3);
        $resultMetric->setTargetId($newComment->getId());
        $entityManager->persist($resultMetric);
        $entityManager->flush();
        */

        return $this->json(["idOfCreatedComment" => $newComment->getId()]);
    }

    #[Route('api/comment/{id}', methods: ['DELETE'])]
    public function deleteOne(int $id, EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $result = ["deletedCommentId" => $id,];
        $deletingComment = $entityManager
            ->getRepository(Comment::class)
            ->find($id);
        if ($deletingComment->getUserId() != $userId)
            return $this->json(["You are not owner of that comment to delete it"], Response::HTTP_FORBIDDEN);
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

    #[Route('api/comment/{id}', methods: ['PUT'])]
    public function updateOne(Request $request, int $id, EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $commentToUpdate = $entityManager
            ->getRepository(Comment::class)
            ->find($id);
        if ($commentToUpdate->getUserId() != $userId)
            return $this->json(["You are not owner of that comment to update it"], Response::HTTP_FORBIDDEN);
        $newCommentBody = $request->request->get('commentBody');
        $commentToUpdate->setBody($newCommentBody);
        $commentToUpdate->setIsEdited(true);
        $entityManager->persist($commentToUpdate);
        $entityManager->flush();
        return $this->json(["id" => $id], Response::HTTP_OK);
    }
    #[Route('/api/user/{userId}/comments', methods: ['GET'])]
    public function getUserComments(int $userId, EntityManagerInterface $entityManager): Response
    {
        $user = $entityManager->getRepository(User::class)->find($userId);
        $userSpecificComments = $entityManager->getRepository(Comment::class)->findBy(['userId' => $user->getId()]);
        foreach ($userSpecificComments as $comment) {
            $comment->setUsername($user->getUsername());
            $comment->setRating(55);
            $votes = $entityManager
                ->getRepository(Vote::class)
                ->findBy(['type' => 2, 'targetId' => $comment->getId()]);
            $upVotes = array_filter($votes, fn($v) => $v->getUpDown() == true);
            $downVotes = array_filter($votes, fn($v) => $v->getUpDown() == false);
            $comment->setRating(count($upVotes) - count($downVotes));
            $comment->setProfilePicture($user->getProfilePictureUrl());
        }
        return $this->json($userSpecificComments);
    }
}
