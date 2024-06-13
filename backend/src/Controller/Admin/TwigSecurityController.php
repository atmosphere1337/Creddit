<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class TwigSecurityController extends AbstractController
{
    #[Route(path: '/admin/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        $context = [
            'action' => '/admin/login',
            'username_parameter' => 'email',
            'password_parameter' => 'password',
            'csrf_token_intention' => 'authenticate',
            'username_label' => 'Email',
        ];
        return $this->render('@EasyAdmin/page/login.html.twig', $context);
    }

    #[Route(path: '/admin/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
