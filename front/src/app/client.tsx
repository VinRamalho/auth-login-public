"use client";

import RedirectPage from "@/components/redirect";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const [redirect, setRedirect] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRedirect(`/login`);
  }, []);

  if (redirect) {
    return <RedirectPage url={redirect} />;
  }

  return <></>;
}
