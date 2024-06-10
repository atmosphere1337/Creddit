<?php
namespace App\Controller\mocking;
use App\Other\MockdataConstants\FirstLoadApiResponseMockData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FirstLoadMockingController extends AbstractController
{
    #[Route('/api/mockup/feed')]
    public function feedAction(): Response
    {
        $data = [
            'corePayload' => [
                'manyPosts' => FirstLoadApiResponseMockData::POST_MANY,
                'manyAdvertisementsPublic' => FirstLoadApiResponseMockData::ADVERTISEMENT_PUBLIC,
                'manyPopularChannels' => FirstLoadApiResponseMockData::POPULAR_CHANNELS,
            ],
        ];
        return $this->json($data);
    }

    #[Route('/api/mockup/admin')]
    public function adminAction() : Response
    {
        $data = [
            'corePayload' => [
                'manyAdvertisementsPrivate' => FirstLoadApiResponseMockData::ADVERTISEMENT_PRIVATE,
            ],
        ];
        return $this->json($data);
    }

    #[Route('/api/mockup/c/darksouls/')]
    public function channelAction() : Response
    {
        $data = [
            'corePayload' => [
                'manyPosts' => FirstLoadApiResponseMockData::POST_MANY,
                'manyAdvertisementsPublic' => FirstLoadApiResponseMockData::ADVERTISEMENT_PUBLIC,
                'oneChannelInfoCard' => FirstLoadApiResponseMockData::CHANNEL_INFO_CARD,
                'oneChannelWallpaperInfo' => FirstLoadApiResponseMockData::CHANNEL_INFO_WALLPAPER,
            ]
        ];
        return $this->json($data);
    }

    #[Route('/api/mockup/posts/asjdhajdhsASD123123/')]
    public function postAction() : Response
    {
        $data = [
            'corePayload' => [
                'onePost' => FirstLoadApiResponseMockData::POST_ONE,
                'manyAdvertisementsPublic' => FirstLoadApiResponseMockData::ADVERTISEMENT_PUBLIC,
                'oneChannelInfoCard' => FirstLoadApiResponseMockData::CHANNEL_INFO_CARD,
                'manyComments' => FirstLoadApiResponseMockData::COMMENTS,
            ]
        ];
        return $this->json($data);
    }

    #[Route('/api/mockup/user/Increddible1337/')]
    public function userProfileAction() : Response
    {
        $data = [
            "corePayload" => [
                'oneUserProfileMainInfo' => FirstLoadApiResponseMockData::PROFILE_INFO_MAIN,
                'manyUserProfilePosts' => FirstLoadApiResponseMockData::PROFILE_POSTS,
                'manyUserProfileComments' => FirstLoadApiResponseMockData::PROFILE_COMMENTS,
            ]
        ];
        return $this->json($data);
    }

    #[Route('/api/mockup/c/darksouls/moderator/')]
    public function moderatorAction() : Response
    {
        $data = [
            "corePayload" => [
                'manyReports' => FirstLoadApiResponseMockData::REPORTS,
                'oneChannelInfoCard' => FirstLoadApiResponseMockData::CHANNEL_INFO_CARD,
            ]
        ];
        return $this->json($data);
    }

}