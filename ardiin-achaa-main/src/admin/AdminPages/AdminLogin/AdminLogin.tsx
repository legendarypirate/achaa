// @ts-nocheck
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [someError, setSomeError] = useState(false);

  const messageHandleOK = () => {
    if (someError) {
      window.location.reload();
    } else {
      setMessageVisible(false);
    }
  };

  const loginOnClick = (e) => {
    e.preventDefault();

    Axios.post("/accounts/login", {
      email: email,
      password: password,
    }).then((res) => {
      const { data } = res;

      if (data.token) {
        if (data.roleID !== 1) {
          localStorage.setItem("adminToken", data.token);
          window.location.replace(`/admin/${data.id}`);
        } else {
          setSomeError(false);

          setMessageType("error");
          setMessageText("Уг формоор зөвхөн админууд нэвтэрнэ!");
          setMessageVisible(true);
        }
      } else if (data.error === 409) {
        setSomeError(false);

        setMessageType("error");
        setMessageText(data.message);
        setMessageVisible(true);
      } else {
        setSomeError(true);

        setMessageType("error");
        setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        setMessageVisible(true);
      }
    });
  };

  return (
    <div id="admin-shadcn-root">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground">
        <Modal
          type={messageType}
          text={messageText}
          visible={messageVisible}
          onOk={messageHandleOK}
          onCancel={() => setMessageVisible(false)}
          disableCloseBtn={false}
        />

        <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-2xl border-slate-800/80 bg-card/95 p-2 shadow-2xl backdrop-blur sm:p-4">
          <CardHeader className="space-y-5 px-2 py-6 text-center sm:space-y-6 sm:px-4 sm:py-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg sm:h-20 sm:w-20">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden />
            </div>
            <img
              src={staticAssetUrl(Logo)}
              alt="E-Achaa"
              className="mx-auto h-14 w-auto max-w-[min(20rem,85vw)] object-contain sm:h-20"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="space-y-2">
              <CardTitle className="font-semibold">Админ удирдлага</CardTitle>
              <CardDescription className="text-muted-foreground">
                Зөвхөн албан эрхтэй хэрэглэгч нэвтэрнэ үү.
              </CardDescription>
            </div>
          </CardHeader>
          <form onSubmit={loginOnClick}>
            <CardContent className="grid gap-5 px-2 sm:gap-6 sm:px-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-email">И-мэйл</Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  placeholder="name@company.mn"
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-password">Нууц үг</Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-2 pb-6 sm:px-4 sm:pb-8">
              <Button type="submit" className="h-12 w-full">
                Нэвтрэх
              </Button>
              <p className="text-center text-regular text-muted-foreground">
                Энгийн гишүүд нүүр хуудасны &quot;Тавтай морил&quot; цонхоор нэвтэрнэ.
              </p>
            </CardFooter>
          </form>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
