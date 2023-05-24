import React, {useState} from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import './MenuItem.scss'
import { Menu } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { BasicModal } from '../../../Shared'
import { FormNewMenu } from '../MenuForm'

const menuController = new Menu()
export function MenuItem(props) {
    const { menu, onReload } = props
    const { accesToken } = useAuth()

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
            setTitleModal(`Actualizar el menu "${menu.title}"`);
            openCloseModal();
        }
    //activa o desactiva el usuario
    const activateDesactivateMenu = async () => {
        try {
            await menuController.updateMenu(accesToken, menu._id, {active: !menu.active});
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
        setConfirmMessage(menu.active ? `¿Estas seguro de desactivar el menu: ${menu.title}?` :  `¿Estas seguro de activar el menu: ${menu.title}?` );
        onCloseConfirm();
    }

    //elimina el menu
    const deleteMenu = async () => {
        try {
            await menuController.deleteMenu(accesToken, menu._id);
            onReload();
            onCloseConfirm();
        } catch (error) {
            throw error;
        }
    }
    //mensaje de confirmacion para activar o desactivar el usuario
    const openDeleteMenuConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`¿Estas seguro de Eliminar el menu: ${menu.title}?`);
        onCloseConfirm();
    }

  return (
    <>
    <div className='menu-item'>
        <div className='menu-item__info'>
            <span className='menu-item__info-title'>{menu.title}</span>
            <span className='menu-item__info-path'>{menu.path}</span>
        </div>
        <div className='menu-item__options'>
            <Button onClick={openUpdateUer} className='menu-item__btn' icon primary>
                <Icon name='pencil' />
            </Button>
            <Button className='menu-item__btn' onClick={openDesactivateActivateConfirm} icon color={menu.active ? "orange" : "teal"} >
                <Icon name={menu.active ? "ban" : "check"} />
            </Button>
            <Button className='menu-item__btn' onClick={openDeleteMenuConfirm} icon color='red'>
                <Icon name='trash' />
            </Button>
        </div>
    </div>

    <BasicModal show={showModal} close={openCloseModal}  title={titleModal}>
            <FormNewMenu  close={openCloseModal} onReload={onReload} menu={menu} />
        </BasicModal>

        <Confirm open={showConfirm} onCancel={onCloseConfirm} onConfirm={isDelete ? deleteMenu : activateDesactivateMenu} content={confirmMessage} size="mini" />
    </>
  )
}
