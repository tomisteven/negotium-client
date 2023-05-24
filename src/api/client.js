import { ENV } from "../utils";


export class Client {

    baseApi = ENV.URL;

    async deleteClient(id,accesToken){
        try {
            const url = `${ENV.URL}/client/delete/${id}`;
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
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateClient(accesToken,data, idCliente ) {
        try {
            const url = `${ENV.URL}/client/update/${idCliente}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    async createClient(accesToken, data) {
        try {
            const url = `${ENV.URL}/client/create`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getClients(accesToken) {
        try {
            const url = `${ENV.URL}/client/all`;
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
        }
        catch (error) {
            console.log(error);
        }
    }

    async getClientsDeudores(accesToken) {
        try {
            const url = `${ENV.URL}/client/clientes/deudores`;
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
        }
        catch (error) {
            console.log(error);
        }
    }

    async getClientsNoDeudores(accesToken) {
        try {
            const url = `${ENV.URL}/client/clientes/SinDeuda`;
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
        }
        catch (error) {
            console.log(error);
        }
    }


    async getClientX(query, accesToken) {
        try {
            const url = `${ENV.URL}/client/genero/x?genero=${query}`;
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
        }
        catch (error) {
            console.log(error);
        }
    }

    async addService(data, accesToken, idCliente) {
        try {
            const url = `${ENV.URL}/client/create/service/${idCliente}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    async addServiceFuture(data, accesToken, idCliente) {
        try {
            const url = `${ENV.URL}/client/create/futureservice/${idCliente}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`,
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    async anularDeuda (accesToken, idCliente, data) {
        try {
            const url = `${ENV.URL}/client/delete/deuda/${idCliente}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }



    async deleteService (accesToken, idCliente, id_servicio) {
        try {
            const url = `${ENV.URL}/client/delete/service/${idCliente}/${id_servicio}`;
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
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteServiceFuture (accesToken, idCliente, id_servicio) {
        try {
            const url = `${ENV.URL}/client/delete/servicefuture/${idCliente}/${id_servicio}`;
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
        }
        catch (error) {
            console.log(error);
        }
    }


    async completeService(accesToken, idCliente, id_servicio) {
        try {
            const url = `${ENV.URL}/client/complete/futureservice/${idCliente}/${id_servicio}`;
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
        }
        catch (error) {
            console.log(error);
        }
    }

    async anularDeuda (accesToken, idCliente, data) {
        try {
            const url = `${ENV.URL}/client/delete/deuda/${idCliente}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAllServices(accesToken) {
        try {
            const url = `${ENV.URL}/client/all/services`;
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
        }
        catch (error) {
            console.log(error);
        }
    }

}