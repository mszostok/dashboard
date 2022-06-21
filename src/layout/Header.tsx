import React, { useContext } from "react";
import "./Header.css";

import { Layout, Menu } from "antd";
import { AuthContext } from "../auth/AuthContext";
import {
  LogoutOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout;

function Header() {
  const authCtx = useContext(AuthContext);

  return (
    <AntHeader className="header">
      <Link className="header-logo" to="/">
        <b className="header-logo-title">Foo name</b>
      </Link>
      <Menu theme="dark" mode="horizontal" className="header-menu">
        <Menu.Item key="docs" icon={<QuestionCircleOutlined />}>
          <a href="https://example.com/docs" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </Menu.Item>
        <SubMenu key="account" title="User" icon={<UserOutlined />}>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => authCtx.logout()}
          >
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </AntHeader>
  );
}

export default Header;
