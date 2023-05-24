import { ENV } from "../utils";

export class Files{


    async getFiles(accesToken){
        try {
            const url = `${ENV.URL}/files/get`;
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

        }
    }

    async deleteFile(accesToken, file_id){
        try {
            const url = `${ENV.URL}/files/delete/${file_id}`;
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

        }
    }
}