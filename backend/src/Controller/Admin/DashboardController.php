<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\UserMenu;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin/', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Admin panel');
    }

    public function configureMenuItems(): iterable
    {
        return [
            MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),
            MenuItem::section('Users'),
            MenuItem::linkToCrud('Users', 'fas fa-users', User::class),
        ];
    }
    public function configureUserMenu(UserInterface $user) : UserMenu {
        return parent::configureUserMenu($user)
            ->setName('what')
            ->setMenuItems([
                //MenuItem::linkToRoute('My profile', 'fa fa-id-card', '', []),
                MenuItem::linkToLogout('Logout', 'fa fa-sign-out'),
            ]);

    }
}
