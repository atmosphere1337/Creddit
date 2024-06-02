import React, {useEffect, useState} from "react";
import { useAppSelector, useAppDispatch } from "../other/hooks";
import { setColorModeDark, setColorModeLight, setLoggedIn, setLoggedOut } from "../other/userSlice";

function ApiFirstLoad () {
    const dispatch = useAppDispatch();
    const selectorColorTheme = useAppSelector((state) => state.user.colorMode);
    const selectorLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    useEffect(() => {
        console.log("selectorColorTheme",selectorColorTheme);
        console.log("selectorLoggedIn",selectorLoggedIn);
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