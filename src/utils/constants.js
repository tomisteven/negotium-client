const SERVER_IP = "localhost:3020";

const production = false;

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}` ,
    BASE_API : `http://${SERVER_IP}/api/v1`,
    URL: production? "https://apinegotium.up.railway.app" : "http://localhost:8080",
    URL_LOGIN : `https://apinegotium.up.railway.app/auth/login`,
    URL_REGISTER : `https://apinegotium.up.railway.app/auth/register`,
    URL_GETME : `https://apinegotium.up.railway.app/user/me`,
    API_ROUTES : {
        REGISTER  : "auth/register",
        LOGIN : "auth/login",
        USER_ME : "user/me",
        REFRESH_TOKEN : "auth/refresh_access_token",
        USER_CREATE : "user",
        GET_USERS: "users/?",
        UPDATE_USER: "user/",
        DELETE_USER: "user/",
        GET_MENUS: "menu",
        CREATE_MENU: "menu",
        UPDATE_MENU: "menu/",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",

    }

}