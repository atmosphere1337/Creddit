import {useEffect} from "react";

function ApiFirstLoad () {
    useEffect(() => {
        let url : string = "/api/feed";
        fetch(url)
            .then(res => res.json() )
            .then( payload => {
                console.log(JSON.stringify(payload));
            });
    });
    return (
        <></>
    );
}
export default ApiFirstLoad;