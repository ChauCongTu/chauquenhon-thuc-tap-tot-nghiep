import Cookie from "js-cookie";

export const setCookie = (
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
) => {
    Cookie.set(name, value, options);
};

export const getCookie = (name: string) => {
    return Cookie.get(name);
};

export const removeCookie = (name: string) => {
    Cookie.remove(name);
};
