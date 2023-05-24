import {ENV} from "../utils"


export class User{
    baseApi = ENV.BASE_API;


    async getMe(accesToken){
        try {
            const url = ENV.URL_GETME;
             const params = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }

    }

    async createUser(accesToken, data){
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            }); //recorremos el objeto
            //console.log(formData);

            if(data.fileAvatar){
                formData.append("avatar", data.fileAvatar);
            }

            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER_CREATE}`;
            const params ={
                method: "POST",
                headers: {
                    "Authorization": `${accesToken}`
                },
                body: formData
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;

        } catch (error) {
            throw error;
        }
    }

    async getUsers(accesToken, active=undefined){
        try {
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GET_USERS}active=${active}`;
            const params = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(accesToken, id, data){
        try{
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            }); //recorremos el objeto


            if(data.fileAvatar){
                formData.append("avatar", data.fileAvatar);
            }

            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.UPDATE_USER}${id}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Authorization": `${accesToken}`
                },
                body: formData
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            throw error;
        }

    }

    async deleteUser(accesToken, id){
        try {
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.DELETE_USER}${id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Authorization": `${accesToken}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            throw error;
        }
    }

}