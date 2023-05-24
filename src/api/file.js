import { ENV } from "../utils";

export class Files {
    async createFile(dataF, token){
        {


             const url = "http://localhost:8080" + "/files/add";
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                },
                body: JSON.stringify(dataF)
            });
            const data = await res.json();
            console.log(data);
          }
    }
}