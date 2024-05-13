<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MockingController extends AbstractController
{
    #[Route('/api/feed')]
    public function feed(): Response
    {
        $data = [
            "payload" => "hi this is payload"
        ];
        return $this->json($data);
    }
}