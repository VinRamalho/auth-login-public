"use client";

import "./style.css";
import LoadingPage from "@/components/loading";
import { notifyError } from "@/components/notification";
import RedirectPage from "@/components/redirect";
import { AuthService } from "@/service/auth";
import { Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";

interface ILogin {
  username: string;
  password: string;
}

export default function AuthLoginClient() {
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState<string | undefined>(undefined);

  const [form] = Form.useForm();

  useEffect(() => {
    if (AuthService.IsAuthenticated) {
      setRedirect("/app");

      return;
    }

    setLoading(false);
  }, []);

  async function onSubmit({ username, password }: ILogin) {
    setSubmitting(true);
    try {
      // call service
      await AuthService.signIn(username, password);

      setSubmitted(true);
      setRedirect("/app");
    } catch (err: any) {
      console.log(err);
      notifyError({ content: err?.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (redirect) {
    return <RedirectPage url={redirect} />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Form
      onFinish={onSubmit}
      className="login-form-container"
      initialValues={{
        username: AuthService.Username ?? "",
        password: "",
      }}
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
      form={form}
      layout="vertical"
    >
      <Space direction="vertical" className="login-form" wrap>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Por favor, digite seu Email" }]}
          initialValue={AuthService.Username}
          label={"Email"}
        >
          <Input
            type="text"
            disabled={submitting || sending}
            placeholder={"Digite o Email de sua empresa"}
            maxLength={150}
            defaultValue={AuthService.Username}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={"SENHA"}
          rules={[{ required: true, message: "Por favor, digite sua senha" }]}
        >
          <Input.Password
            disabled={submitting || sending}
            placeholder={"Digite sua senha"}
            maxLength={50}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={submitting || sending}
          className="login-buttom btn-icon"
        >
          Entrar
        </Button>
      </Space>
    </Form>
  );
}
