import React, {useState, useEffect} from 'react'
import { map,size } from 'lodash'
import { Menu } from '../../../../api'
import {MenuItem} from '../MenuItem'
import { useAuth } from '../../../../hooks'
import { Loader } from 'semantic-ui-react'


const menuController = new Menu()
export function ListMenu(props) {
    const { active, reload, onReload } = props
    const { accesToken } = useAuth()
    //console.log(accesToken);
    const [menus, setMenus] = useState(null)

      useEffect(() => {
        (async() => {
            try {
                setMenus(null)
                const response = await menuController.getMenus(accesToken, active)
                setMenus(response)
            } catch (error) {
                throw error;
            }
        })()
    }, [accesToken, active, reload])

    if(size(menus) === null || size(menus) === 0) {
        return "No hay menus";
    }

    if(!menus || menus === null) {
        return <Loader active inline="centered" />;
    }
    //console.log(menus);

    return map(menus, (menu) => (<MenuItem onReload={onReload} menu={menu} key={menu._id} />))

}
