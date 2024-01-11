"use client";

import "./style.css";
import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import RedirectPage from "@/components/redirect";
import LoadingPage from "@/components/loading";
import ErrorPage from "@/components/error";
import { UserService } from "@/service/user";
import { IUser } from "@/service/user/interface";
import Column from "antd/es/table/Column";
import { notifyError } from "@/components/notification";

export default function AppClient() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const users = await UserService.get();
        console.log(users);
        setUsers(users);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (redirect) {
    return <RedirectPage url={redirect} />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Space direction="vertical" className="container-app" wrap>
      <Table
        dataSource={users}
        size="large"
        className="header-table"
        bordered={false}
        pagination={{ position: [] }}
      >
        <Column title={"Id"} dataIndex="_id" key="1" />
        <Column title={"Nome"} dataIndex="name" key="2" />
        <Column title={"Email"} dataIndex="email" key="3" />
      </Table>
    </Space>
  );
}
