
import React , {useState, useEffect, createContext} from 'react';
import { Auth } from '../api';
import { User } from '../api/user';
import { tokenExpired } from '../utils';
import { ErrorPage } from '../Components/Shared';

export const AuthContext = createContext(); //creamos el contexto de autenticacion y lo exportamos
const authController = new Auth(); //creamos una instancia de la clase Auth
const userController = new User(); //creamos una instancia de la clase User

//creamos el provider de autenticacion
export function AuthProvider(props) {
    const {children} = props;

    const [user, setUser] = useState(null); //creamos el estado del usuario
    const [token, setToken] = useState(null); //creamos el estado del token
    const [loading, setLoading] = useState(true); //creamos el estado de carga



 useEffect(() => {
        (async () => {

            //comprobamos si el usuario esta logueado y si tiene un token valido en el localstorage del navegador lo devuelve
            const accessToken =  authController.getAccessToken();
            //devuelve el refresh token
            const refreshToken = authController.getRefreshToken();

            //si no hay token de acceso, entonces no hay usuario logueado
            if(!accessToken || !refreshToken || accessToken === 'undefined' || refreshToken === 'undefined'){
                cerrarSesion();
                setLoading(false);
                return;
            }

            //si el token esta expirado
            if(tokenExpired(accessToken)){
                //si el token esta expirado, refrescamos el token
                if(tokenExpired(refreshToken)) cerrarSesion(); //refrescamos el token
                else {
                    await loginAuthContext(accessToken)
                    setLoading(false);
                } ; //si el token no esta expirado, logueamos al usuario
            }
            await loginAuthContext(accessToken);
            setLoading(false);

        })()
    }, []);

    //creamos la funcion para loguear al usuario
    const loginAuthContext = async (accessToken) => {
        try {
            //obtenemos los datos del usuario
            const response = await userController.getMe(accessToken);
            //si la respuesta es correcta eliminamos la contraseña del usuario
            delete response.password;
            //guardamos el usuario en el estado
            setUser(response);
            //guardamos el token en el estado
            setToken(accessToken);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    //creamos la funcion para refrescar el token
    const reLoadingAuthContext = async (refreshToken) => {
        try {
            //obtenemos el nuevo token
            const {accessToken} = await authController.refreshAccessToken(refreshToken);
            //guardamos el nuevo token en el localstorage
            authController.setAccessToken(accessToken);
            //actualizamos el estado del token
            await loginAuthContext(accessToken);
        } catch (error) {
            console.log(error);
        }
    }

    //creamos la funcion para desloguear al usuario
    const cerrarSesion = () => {
        //eliminamos el token del localstorage
        authController.removeTokens();
        //eliminamos el usuario del estado
        setUser(null);
        //eliminamos el token del estado
        setToken(null);
    }


    const data = {
        accesToken: token,
        user,
        login: loginAuthContext,
        logout: cerrarSesion,
    }

    if(loading) return null;

    /* if(user &&  typeof authController.getAccessToken == "undefined" && typeof authController.getRefreshToken == "undefined") return {children}; */



    return (
        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
    )
}

