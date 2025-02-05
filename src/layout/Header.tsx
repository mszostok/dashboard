import React from "react";

import { Layout, Menu } from "antd";
import { useLocation, Link } from "react-router-dom";

const { Header: AntHeader } = Layout;

function Header() {
  const location = useLocation();

  const links = [
    {
      name: "Actions",
      route: "/actions",
    },
  ];

  const currentRoute = links.find((elem) =>
    location.pathname.startsWith(elem.route)
  );

  return (
    <AntHeader style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentRoute?.route ?? ""]}
      >
        {links.map(({ route, name }) => (
          <Menu.Item key={route}>
            <Link to={route}>{name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </AntHeader>
  );
}

export default Header;
