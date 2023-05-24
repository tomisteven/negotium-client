import { ENV } from "../utils/constants";

export class Auth {
    baseApi = ENV.BASE_API;

    async register(data){
        try {
            const url = ENV.URL_REGISTER;
            //console.log(url);
            //console.log(data);
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
                ,
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    repeatPassword: data.repeatPassword,
                    name: data.name,
                    lastname: data.lastname
                })
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200){
                throw new Error(result.message);
            }
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(data, token){
        try {
            const url = `${ENV.URL}/user/update`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async loginForm(data){
        try {
            const url = ENV.URL_LOGIN;
            const params= {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            }
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200){
                throw new Error(result.message);
            }
            console.log(result);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async refreshAccessToken(refreshToken){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_TOKEN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: refreshToken
                })
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async setAccessToken(accessToken){
        localStorage.setItem(ENV.JWT.ACCESS, accessToken);
    }

    getAccessToken(){
        return localStorage.getItem(ENV.JWT.ACCESS);
    }

    setRefreshToken(refreshToken){
        localStorage.setItem(ENV.JWT.REFRESH, refreshToken);
    }

    getRefreshToken(){
        return localStorage.getItem(ENV.JWT.REFRESH);
    }

    removeTokens(){
        localStorage.removeItem(ENV.JWT.ACCESS);
        localStorage.removeItem(ENV.JWT.REFRESH);
    }



}