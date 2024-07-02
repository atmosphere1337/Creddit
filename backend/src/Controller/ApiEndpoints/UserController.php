<?php

namespace App\Controller\ApiEndpoints;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/user', methods: ['POST'])]
    public function registerNewAccount(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): Response
    {
        $newUser = new User();
        $newUser->setEmail($request->request->get('email'));
        $newUser->setUsername($request->request->get('username'));
        $newPassword = $passwordHasher->hashPassword($newUser, $request->request->get('password'));
        $newUser->setPassword($newPassword);
        $newUser->setRoles(['ROLE_USER']);
        $newUser->setLastVisit(new \DateTime('now'));
        $entityManager->persist($newUser);
        $entityManager->flush();
        return $this->json(['id' => $newUser->getId()], Response::HTTP_CREATED);
    }
    #[Route('/api/usersmall', methods: ['GET'])]
    public function getUserInfo(EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $thisUser = $entityManager->getRepository(User::class)->find($userId);
        $thisUser->setNotCheckedNotificationAmount(0); // replace here notification load later
        $response = [
            'id' => $thisUser->getId(),
            'username' => $thisUser->getUsername(),
            'profilePictureUrl' => $thisUser->getProfilePictureUrl(),
            'notCheckedNotificationAmount' => $thisUser->getNotCheckedNotificationAmount(),
        ];
        return $this->json($response, Response::HTTP_OK);
    }
    #[Route('/api/user', methods: ['GET'])]
    public function getUserEndpoint(EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $userId = $user->getId();
        $thisUser = $entityManager->getRepository(User::class)->find($userId);
        $response = [
            'email' => $thisUser->getEmail(),
            'username' => $thisUser->getUsername(),
            'profilePictureUrl' => $thisUser->getProfilePictureUrl(),

        ];
        return $this->json($response, Response::HTTP_OK);
    }

}