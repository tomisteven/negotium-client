import React, {useState} from 'react'
import {Image, Button, Icon, Confirm, Loader } from 'semantic-ui-react';
import { image } from '../../../../assets';
import { ENV } from '../../../../utils';
import "./UserItem.scss";
import { BasicModal } from '../../../Shared';
import { FormUsers} from "../../../Admin/Users";
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';

const userController = new User();
export function UserItem(props) {
    const { accesToken } = useAuth(); //obtenemos el token del usuario
    const {user, onReload} = props;
    //const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    //activar usuario
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    //cierra confirmacion
    const onCloseConfirm = () => setShowConfirm(!showConfirm);
    //abre modal del formulario de usuarios
    const openCloseModal = () => setShowModal((prevState) => !prevState);
    //actualiza el titulo de la ventana modal y abre la ventana modal
    const openUpdateUer = () => {
        setTitleModal(`Actualizar usuario ${user.email}`);
        openCloseModal();
    }

    //activa o desactiva el usuario
    const activateDesactivateUser = async () => {
        try {
            await userController.updateUser(accesToken, user._id, {active: !user.active});
            onReload();
            onCloseConfirm();
        } catch (error) {
            throw error;
        }
         onCloseConfirm();
    }

    //mensaje de confirmacion para activar o desactivar el usuario
    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(user.active ? `¿Estas seguro de desactivar el usuario: ${user.email}?` : "¿Estas seguro de activar el usuario?");
        onCloseConfirm();
    }


    //***************/ */
    //elimina el usuario
    //activa o desactiva el usuario
    const deleteUser = async () => {
        try {
            await userController.deleteUser(accesToken, user._id);
            onReload();
            onCloseConfirm();
        } catch (error) {
            throw error;
        }
         onCloseConfirm();
    }

    //mensaje de confirmacion para activar o desactivar el usuario
    const openDeleteUserConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`¿Estas seguro de Eliminar el usuario: ${user.email}?`);
        onCloseConfirm();
    }



  return (
    <>
        <div className="user-item">
            <div className="user-item__info">
                <Image src={
                    user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
                } avatar />

                <div>
                    <h4><span className='user-item__role'>Role:</span> {user.role === "admin" ? "Administrador" : "Usuario"}</h4>
                    <p>{user.name} {user.lastname}</p>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className='user-item__options'>
                <Button  primary icon onClick={openUpdateUer}>
                    <Icon name="pencil alternate" />
                </Button>
                <Button  icon onClick={openDesactivateActivateConfirm} color={user.active ? "orange" : "teal"}>
                    <Icon name={user.active ? "ban" : "check"}  />
                </Button>
                <Button icon onClick={openDeleteUserConfirm} color="red">
                    <Icon name="trash"  />
                </Button>
            </div>
        </div>

        <BasicModal show={showModal} close={openCloseModal}  title={titleModal}>
            <FormUsers close={openCloseModal} onReload={onReload} user={user} />
        </BasicModal>

        <Confirm open={showConfirm} onCancel={onCloseConfirm} onConfirm={isDelete ? deleteUser : activateDesactivateUser} content={confirmMessage} size="mini" />
    </>
  )
}
