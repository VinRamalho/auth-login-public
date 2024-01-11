import "./style.css";
import { ReactNode } from "react";
import NavBar from "./navbar";
import Header from "./header";

interface IProps {
  children: ReactNode;
}

export default function LayoutPage({ children }: IProps) {
  return (
    <>
      <Header />
      <NavBar />
      <main>{children}</main>
    </>
  );
}
