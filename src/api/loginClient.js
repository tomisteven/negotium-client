import { ENV } from "../utils";


export class loginClient {
    baseApi = ENV.URL;

    async loginClient(id_user, form) {
        try {
            const url = `${ENV.URL}/client/login/` + id_user;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password
                })
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }



}