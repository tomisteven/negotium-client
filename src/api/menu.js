import { ENV } from "../utils";


export class Menu{
    baseApi = ENV.BASE_API;

    async getMenus(accesToken, active){
        try {
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.GET_MENUS}/?active=${active}`;
            const params = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();
            //const menuState = result.filter(menu => menu.active === active);
            //return menuState;
            return result;
        } catch (error) {

        }
    }

    async createMenu(accesToken, data){
        try {
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.CREATE_MENU}`;
            const params = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const res = await fetch(url, params);
            const result = await res.json();
            return result;
        } catch (err)
        {
         throw err;
        }
    }

    async updateMenu(accesToken, id,data){
        try {
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.UPDATE_MENU}${id}`;
            const params = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                method: "PATCH",
                body: JSON.stringify(data)
            }
            const res = await fetch(url, params);
            const result = await res.json();
            return result;
        } catch (error) {

        }
    }

    async deleteMenu(accesToken, menuId){
        try {
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.CREATE_MENU}/${menuId}`;
            const params = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accesToken}`
                },
                method: "DELETE",
            }
            const res = await fetch(url, params);
            const result = await res.json();
            return result;
        } catch (error) {

        }
    }




}