"use client";

import "./style.css";
import { AuthService } from "@/service/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    function load() {
      setAuthenticated(AuthService.IsAuthenticated);
    }

    load();
  }, []);

  if (!authenticated) {
    return <></>;
  }

  return (
    <header>
      <h3>
        <b>{`${`Olá, ${AuthService.Name}!`}`}</b>
      </h3>
    </header>
  );
}
