"use client";

import "./style.css";
import { AuthService } from "@/service/auth";
import { Button, Menu, Divider } from "antd";
import { useEffect, useState } from "react";
import { items } from "./data";
import IconView from "@/components/icon";
import { Icon } from "@/components/icon/interface";

export default function NavBar() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    function load() {
      setAuthenticated(AuthService.IsAuthenticated);
    }

    load();
  }, []);

  function onSignOut() {
    AuthService.signOut();
    window.location.reload();
  }

  if (!authenticated) {
    return <></>;
  }
  return (
    <aside className="container-nav">
      <Menu
        className="navbar-menu"
        mode="inline"
        items={items}
        defaultSelectedKeys={["1"]}
      />

      <Divider />

      <Button
        id="logout"
        type="text"
        icon={<IconView id={Icon.Logout} />}
        size={"large"}
        onClick={onSignOut}
      >
        Sair
      </Button>
    </aside>
  );
}
