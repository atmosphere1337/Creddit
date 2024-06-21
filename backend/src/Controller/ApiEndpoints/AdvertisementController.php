<?php
namespace App\Controller\ApiEndpoints;

use App\Entity\Advertisement;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Channel;
use App\Entity\Subscription;

class AdvertisementController extends AbstractController  {
    #[Route('api/advertisements/all', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager) : Response {
        $retrievedAds = $entityManager->getRepository(Advertisement::class)->findAll();
        return $this->json($retrievedAds);
    }
    /*
    #[Route('api/public/advertisements/public', methods: ['GET'])]
    public function getPublic(EntityManagerInterface $entityManager) : Response {
        $retrievedAds = $entityManager->getRepository(Advertisement::class)->findBy('visible' => true);
        return $this->json($retrievedAds);
    }
    */
    /*
    #[Route('api/public/advertisements/one/{id}', methods: ['GET'])]
    public function getOne(EntityManagerInterface $entityManager, int $id) : Response {
        $retrievedAd = $entityManager->getRepository(Advertisement::class)->find($id);
        return $this->json($retrievedAd);
    }
    */
}
