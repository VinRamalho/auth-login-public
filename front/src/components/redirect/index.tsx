"use client";

import "./style.css";
import { useEffect } from "react";
import LoadingPage from "../loading";

interface IProps {
  url: string;
  text?: string;
}

export default function RedirectPage({ url }: IProps) {
  useEffect(() => {
    location.href = url;
  }, [url]);

  return (
    <div id="redirect">
      <LoadingPage />
    </div>
  );
}
