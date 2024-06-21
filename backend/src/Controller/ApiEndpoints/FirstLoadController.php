<?php
namespace App\Controller\ApiEndpoints;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FirstLoadController extends AbstractController  {
    #[Route('api/feed', name: 'first_load')]
    public function feedAction() : Response {
        return $this->json(["test test"]);
    }
}


