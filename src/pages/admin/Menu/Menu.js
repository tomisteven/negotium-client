import React, { useState } from "react";
import { Tab, Button, Confirm } from "semantic-ui-react";
import { ListMenu, FormNewMenu } from "../../../Components/Admin/Menu";
import "./Menu.scss";
import { BasicModal } from "../../../Components/Shared";

export function Menu() {
	const [reload, setReload] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const onReload = () => {
		setReload((prev) => !prev);
	};

	const onOpenCloseModal = () => {
		setShowModal((prev) => !prev);
	};

	const panes = [
		{
			menuItem: "Menus Inactivos",
			render: () => (
				<Tab.Pane attached={false}>
					<ListMenu
						active={false}
						onReload={onReload}
            reload={reload}
					/>
				</Tab.Pane>
			),
		},
		{
			menuItem: "Menus Activos",
			render: () => (
				<Tab.Pane attached={false}>
					<ListMenu
						active={true}
						reload={reload}
						onReload={onReload}
					/>
				</Tab.Pane>
			),
		},
	];

	return (
		<div className='menu-page'>
			<Button
				onClick={onOpenCloseModal}
				primary
				className='menu-page__add'>
				Nuevo Menu
			</Button>
			<Tab
				panes={panes}
				menu={{ secondary: true, pointing:true }}
			/>

			<BasicModal
				close={onOpenCloseModal}
				show={showModal}
				title='Nuevo Menu'>
				<FormNewMenu
					onReload={onReload}
					close={onOpenCloseModal}
				/>
			</BasicModal>
		</div>
	);
}
