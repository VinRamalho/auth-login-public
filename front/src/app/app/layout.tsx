"use client";

import { AuthService } from "@/service/auth";
import "./style.css";
import { ReactNode, useEffect, useState } from "react";
import RedirectPage from "@/components/redirect";

interface IProps {
  children: ReactNode;
}

export default function AppLayout({ children }: IProps) {
  const [redirect, setRedirect] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!AuthService.IsAuthenticated) {
      setRedirect("/login");
      return;
    }
  }, []);

  if (redirect) {
    return <RedirectPage url={redirect} />;
  }

  return <section id="app">{children}</section>;
}
