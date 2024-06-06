import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import {RootState} from '../store';

interface IUserState  {
    colorMode: "dark" | "light",
    isLoggedIn: boolean,
    isModerator: boolean,
    isAdmin: boolean,
}

//-----------------------------------------------------------------------------------------
const LOGGEDIN_COOKIE_NAME : string = "credditLoggedIn";
const COLORTHEME_COOKIE_NAME : string = "credditColorTheme";

function getCookie(cookieName : string) : string | undefined {
    const cookie : string | undefined = document.cookie
        .split("; ")
        .find((row) => row.startsWith(cookieName))
        ?.split("=")[1];
    return cookie;
}

function setCookie(cookieName : string, cookieValue : string) : void {
    document.cookie = `${cookieName}=${cookieValue}; max-age=${60*60*24*365}; path=/; SameSite=Lax;`;
}

function doWeRenderGuestOrUserLayout() : boolean {
    let loggedInCookieValue : string | undefined = getCookie(LOGGEDIN_COOKIE_NAME);
    switch (loggedInCookieValue) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            setCookie(LOGGEDIN_COOKIE_NAME, "false");
            return false;
    }
}
function doWeRenderLightOrDarkMode() : "light" | "dark" {
    let colorThemeCookieValue : string | undefined = getCookie(COLORTHEME_COOKIE_NAME);
    if (colorThemeCookieValue === "light" || colorThemeCookieValue === "dark")
        return colorThemeCookieValue;
    setCookie(COLORTHEME_COOKIE_NAME, "dark");
    return "dark";
}

//-----------------------------------------------------------------------------------------
const initialState : IUserState = {
    colorMode: doWeRenderLightOrDarkMode(),
    isLoggedIn: doWeRenderGuestOrUserLayout(),
    isModerator: true,
    isAdmin: true,
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setColorModeDark : (state) => {
            setCookie(COLORTHEME_COOKIE_NAME, "dark");
            state.colorMode = "dark";
        }, 
        setColorModeLight : (state) => {
            setCookie(COLORTHEME_COOKIE_NAME, "light");
            state.colorMode = "light";
        }, 
        setLoggedIn: (state) => {
            setCookie(LOGGEDIN_COOKIE_NAME, "true");
            state.isLoggedIn = true
        },
        setLoggedOut: (state) => {
            setCookie(LOGGEDIN_COOKIE_NAME, "false");
            state.isLoggedIn = false
        },
    }

})
export const { setColorModeDark,
               setColorModeLight,
               setLoggedIn,
               setLoggedOut,
             } = userSlice.actions;
export default userSlice.reducer;