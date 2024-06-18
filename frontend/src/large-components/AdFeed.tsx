import AdBanner from "small-components/AdBanner/AdBanner";
import {IAdvertisementPublic, IChannelInfoWallpaper} from "other/widelyUsedTypes";
import {useEffect, useState} from "react";
import axios from "axios";
import {rawDataAdvertisementPublic, rawDataChannelInfoWallpaper} from "../other/mocking-data/firstLoadData";

function AdFeed() {
    const [ads, setAds] = useState<IAdvertisementPublic[]>([]);
    useEffect(() : void => {
        axios.get('/api/advertisements/all')
            .then((response) : void  => {
                const payload : IAdvertisementPublic[] = response.data.map(
                    (advertisement : any):IAdvertisementPublic => {
                        return {
                            name:"",
                            refLink: advertisement.refLink,
                            pictureLink: advertisement.pictureLink,
                        }
                    }
                );
                setAds(payload);
            })
            .catch( error => {
                setAds(rawDataAdvertisementPublic);
            });
    }, []);
    return (
        <div>
            {ads.map ((element: IAdvertisementPublic) =>
                <AdBanner
                    key = {element.name}
                    name = {element.name}
                    pictureLink = {element.pictureLink}
                    refLink = {element.refLink}
                />
            )}
        </div>
    );
}
export default AdFeed;
