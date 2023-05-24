import React, { useState, useEffect } from "react";
import { Button, Tab } from "semantic-ui-react";
import "./Users.scss";
import { BasicModal } from "../../../Components/Shared";
import { FormUsers, ListUsers } from "../../../Components/Admin/Users";

export function Users() {
	const [showModal, setShowModal] = useState(false);
	const [reload, setReload] = useState(false);

	const onReload = () => {
		setReload((prev) => !prev);
	};

	const onOpenCloseModal = () => {
		setShowModal((prev) => !prev);
	};

	//los panes son los tabs que se muestran en la parte superior de la pagina
	const panes = [
		{
			menuItem: "Usuarios Activos",
			render: () => (
				<Tab.Pane attached={false}>
					<ListUsers
						userActive={true}
						reload={reload}
						onReload={onReload}
					/>
				</Tab.Pane>
			),
		},
		{
			menuItem: "Usuarios Inactivos",
			render: () => (
				<Tab.Pane attached={false}>
					<ListUsers
						userActive={false}
						reload={reload}
						onReload={onReload}
					/>
				</Tab.Pane>
			),
		},
	];

	return (
		<>
			<div className='users-page'>
				<Button
					primary
					className='users-page__add'
					onClick={onOpenCloseModal}>
					Crear Usuario
				</Button>
				<Tab
					menu={{ secondary: true, pointing:true  }}
					panes={panes}
				/>
			</div>

			<BasicModal
				show={showModal}
				close={onOpenCloseModal}
				title='Crear Usuario'
				size='small'>
				<FormUsers
					close={onOpenCloseModal}
					onReload={onReload}
				/>
			</BasicModal>
		</>
	);
}
