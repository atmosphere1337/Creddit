<?php
namespace App\Controller;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

class TestController extends AbstractController
{
    #[Route('/api/doit', methods: ["POST"])]
    public function indexPost(EntityManagerInterface $entityManager, Request $request): Response
    {
        $login = $request->get("login");
        $password = $request->get("password");
        $newUser = new User();
        $newUser->setLogin($login);
        $newUser->setPassword($password);
        $entityManager->persist($newUser);
        $data = [
            "login" => $login,
            "new_id" => $newUser->getId()
        ];

        return $this->json($data);
    }
    #[Route('/api/guard', methods: ["GET"])]
    public function indexPost2(): Response
    {
        return $this->json(["You have done it"]);
    }


}