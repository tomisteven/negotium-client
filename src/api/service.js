import { ENV } from "../utils";


export class Services{
    baseApi = ENV.URL;

    async createService(formData, accesToken){
        try {
            const url = `${ENV.URL}/services/create`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getServices(accesToken){
        try {
            const url = `${ENV.URL}/services`;
            const params = {
                method: "GET",
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


    async deleteService(id, accesToken){
        try {
            const url = `${ENV.URL}/services/delete/${id}`;
            const params = {
                method: "DELETE",
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

    async toggleService(id, accesToken){
        try {
            const url = `${ENV.URL}/services/toggle/${id}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {

        }
    }

    async updateService(id, formData, accesToken){
        try {
            const url = `${ENV.URL}/services/update/${id}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }
}