import AdBanner from "../small-components/AdBanner/AdBanner";
import styled from "styled-components";
import {useAppSelector} from "../other/hooks";
import {IAdvertisement} from "../other/widelyUsedTypes";

function AdFeed() {
    const getAds : IAdvertisement[] = useAppSelector(state => state.ads.allAdsPublic);
    return (
        <div>
            {getAds.map ((element: IAdvertisement) =>
                <AdBanner
                    key = {element.name}
                    name = {element.name}
                    picture = {element.picture}
                    link = {element.link}
                />
            )}
        </div>
    );
}
export default AdFeed;
