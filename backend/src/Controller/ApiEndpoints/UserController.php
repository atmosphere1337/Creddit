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
        $user->setNotCheckedNotificationAmount(0); // replace here notification load later
        $response = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'profilePictureUrl' => $user->getProfilePictureUrl(),
            'notCheckedNotificationAmount' => $user->getNotCheckedNotificationAmount(),
        ];
        return $this->json($response, Response::HTTP_OK);
    }
    #[Route('/api/user', methods: ['GET'])]
    public function getUserEndpoint(EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $response = [
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'profilePictureUrl' => $user->getProfilePictureUrl(),

        ];
        return $this->json($response, Response::HTTP_OK);
    }
    #[Route('/api/user', methods: ['PUT'])]
    public function updateOne(EntityManagerInterface $entityManager, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $user->setEmail($request->request->get('email'));
        $user->setUsername($request->request->get('username'));
        $user->setProfilePictureUrl($request->request->get('profilePictureUrl'));
        $oldPlainPassword = $request->request->get('oldPassword');
        $newPlainPassword = $request->request->get('newPassword');
        if (!$passwordHasher->isPasswordValid($user, $oldPlainPassword))
            return $this->json([], Response::HTTP_FORBIDDEN);
        $user->setPassword($passwordHasher->hashPassword($user, $newPlainPassword));
        $entityManager->persist($user);
        $entityManager->flush();
        return $this->json(['id' => $user->getId()], Response::HTTP_OK);
    }

}