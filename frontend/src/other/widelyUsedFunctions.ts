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

export function deleteCookie(cookieName : string) : void {
    document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax;`;
}

export function getDateTimeStringAndTranslateItToAgeString(dateTimeString : string){
    let gottenTimeInMilliseconds: number  = new Date(dateTimeString).getTime();
    const timeMs : number = Date.now() - gottenTimeInMilliseconds;
    let time : number = Math.floor(timeMs / 1000);
    const timeMeasure : number[] = [60, 60, 24, 30, 12];
    const timeUnits : string[] = ["seconds", "minutes", "hours", "days", "months"];
    let index : number = -1;
    let result: number = 0;
    while (time > 0 && index < timeMeasure.length) {
        result = time % timeMeasure[++index];
        time = Math.floor(time / timeMeasure[index]);
    }
    return `${result} ${timeUnits[index]} ago`;
    /*
    let gottenTimeInMilliseconds: number  = new Date(dateTimeString).getTime();
    const timeMs : number = Date.now() - gottenTimeInMilliseconds;
    let time : number = Math.floor(timeMs / 1000);
    const seconds : number = time % 60;
    time = Math.floor(time / 60);
    const minutes: number = time % 60;
    time = Math.floor(time / 60);
    const hours: number = time % 24;
    time = Math.floor(time / 24);
    const days: number = time % 30;
    time = Math.floor(time / 30);
    const months: number = time % 12;
    time = Math.floor(time / 12);
    return `months: ${months}, days: ${days}, hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`;
    */
}