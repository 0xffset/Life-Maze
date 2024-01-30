import { IPoint } from "../../LifeMaze/data/type";

/**
 * Tries to get a cookie by name.
 * source: https://www.w3schools.com/js/js_cookies.asp
 * @param cname The cookie's name.
 * @returns The cookie's value.
 */
export const getCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
     let c = ca[i];

     while (c.charAt(0) === " ") {
        c = c.substring(1);
     }

     if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
     }
  }

  return "";
};

export const getDistance = (a: IPoint, b: IPoint): number => {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
  };
  