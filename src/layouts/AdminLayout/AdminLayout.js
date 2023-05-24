import React, { useState, Suspense, lazy } from "react";
import "./AdminLayout.scss";
import "./AdminLayout.css";
import { AdminMenu } from "../../Components/Admin/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
//import { Logout } from "../../Components/Admin/AdminLayout/Logout";
import { AdminProfile } from "../../Components/Admin/AdminLayout/AdminProfile/AdminProfile";
import Logo from "../../assets/Negotium Assets/logoN.png";
import { Icon } from "semantic-ui-react";
import {Logout} from "../../Components/Admin/AdminLayout/Logout";

const Component_Menu_left = lazy(() =>
  import("../../Components/Admin/AdminLayout/AdminMenu/AdminMenu")
);
const Component_AdminProfile = React.lazy(() =>
  import("../../Components/Admin/AdminLayout/AdminProfile/AdminProfile")
);
export function AdminLayout(props) {

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const { children } = props;

  const color = ["#021027ba", "#F0F3F4"];

  const handleLoading = () => {
    setLoading(false)
  }

  return (

    <div className="admin-layout">
      <Suspense fallback={<h1>Loading...</h1>}
      >
        <div className="admin-layout__left">
          <img className="logo" src={Logo} alt="logo" />
          <Component_Menu_left onLoad={handleLoading} />
          <Logout logout={logout} onLoad={handleLoading} />
        </div>
        <div
          className="admin-layout__right"
          style={{
            backgroundColor: user.obscuro ? color[0] : color[1],
          }}
        >
          <div className="admin-layout__right-header">
            <AdminProfile />
          </div>
          <div className="admin-layout__right-content">{children}</div>
        </div>
      </Suspense>
    </div>
  );
}
