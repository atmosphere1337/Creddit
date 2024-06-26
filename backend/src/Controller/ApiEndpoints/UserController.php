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
}