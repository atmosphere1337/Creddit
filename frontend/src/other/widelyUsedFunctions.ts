export function getCookie(cookieName : string) : string | undefined {
    const cookie : string | undefined = document.cookie
        .split("; ")
        .find((row) => row.startsWith(cookieName))
        ?.split("=")[1];
    return cookie;
}

export function setCookie(cookieName : string, cookieValue : string) : void {
    document.cookie = `${cookieName}=${cookieValue}; max-age=${60*60*24*365}; path=/; SameSite=Lax;`;
}

export function deleteCookie(cookieName : string) {
    document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax;`;
}
