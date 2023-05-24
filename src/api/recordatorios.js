import { ENV } from "../utils";


export class Recordatorios {
    baseApi = ENV.URL;

//implementar backend
async borrarTodos(accessToken) {
        const response = await fetch(`${this.baseApi}/recordatorios/all`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            }
        });
        return await response.json();
}

    async anularAll(state, accessToken) {
        const response = await fetch(`${this.baseApi}/recordatorios/complete/all`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            },
            body: JSON.stringify(state),
        });
        return await response.json();
    }

    async createRecordatorio(accessToken , recordatorio) {
        const response = await fetch(`${this.baseApi}/recordatorios/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            },
            body: JSON.stringify(recordatorio),
        });
        return await response.json();
    }

    async toggleRecordatorio(id,accessToken) {
        const response = await fetch(`${this.baseApi}/recordatorios/toggle/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            }
        });
        return await response.json();
    }

    async getRecordatorios(accessToken) {
        const response = await fetch(`${this.baseApi}/recordatorios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            }
        });
        return await response.json();
    }

    async updateRecordatorio(id, recordatorio, accessToken) {
        const response = await fetch(`${this.baseApi}/recordatorios/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            },
            body: JSON.stringify(recordatorio),
        });
        return await response.json();
    }

    async deleteRecordatorio(id, accessToken) {
        const response = await fetch(`${this.baseApi}/recordatorios/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${accessToken}`
            }
        });
        return await response.json();
    }
}