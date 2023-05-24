import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {size, map} from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {
	const { accesToken } = useAuth();
	const { userActive, reload, onReload } = props;


	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
            setUsers(null);
			const response = await userController.getUsers(
				accesToken,
				props.userActive
			);
			setUsers(response);
		})();
	}, [userActive, reload, accesToken, props.userActive]);

    if(!users) {
        return <Loader active inline="centered" />;
    }

    if (size(users) === 0) {
        return "No hay usuarios";

    }


	return map(users, (user) => (<UserItem onReload={onReload} user={user} key={user._id} />))

}


