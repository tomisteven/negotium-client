import { ENV } from "../utils";

export class Membresias {
  baseApi = ENV.URL;

  async updateMembresia(accesToken, member) {
    try {
      const url = `${ENV.URL}/user/active/membresia`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accesToken}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nombre: member,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getLinkToPaySubscription(user, price, tipo) {
    try {
      const url = `${ENV.URL}/pay/subscription/${user._id}?price=${price}&tipo=${tipo}`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getLinkToPayItem(user, product, price, tipo) {
    try {
      const url = `${ENV.URL}/pay/payment/${user._id}?product=${product}&price=${price}`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
