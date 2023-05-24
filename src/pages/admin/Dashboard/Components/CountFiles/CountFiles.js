import React from "react";
import "./CountFiles.css";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export function CountFiles({
  colors,
  img_files,
  name,
  up_file,
  view_files,
  clickModal,
  icon,
}) {
  return (
    <div className="container-cont-items" style={{ background: colors }}>
      <div className="cont-items-header">
        <Icon name={icon} size="large" />
        <h2 className="name-header-v2">{name}</h2>
      </div>
      <div className="cont-body-v2">
        <Link>
          <img className="img-files" src={up_file} alt="" />
        </Link>
        <Link to={"/admin/files"}>
          <img className="img-files" src={view_files} alt="" />
        </Link>
      </div>
    </div>
  );
}
