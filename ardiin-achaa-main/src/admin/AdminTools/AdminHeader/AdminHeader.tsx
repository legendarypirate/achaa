// @ts-nocheck
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../../routes";
import Modal from "../../../tools/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

const AdminHeader = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [modalVisible, setModalVisible] = useState(false);

  const signouBtnOnClick = () => {
    setModalVisible(true);
  };

  const modalHandeleCancel = () => {
    setModalVisible(false);
  };

  const modalHandleOK = () => {
    window.localStorage.removeItem("adminToken");

    if (!localStorage.getItem("adminToken")) {
      window.location.replace("/admin");
    }
  };

  const headingOnChecker = () => {
    const pageName = String(pathname).split("/")[3];

    return ROUTES({ id }).map((item) => {
      if (!item) {
        return null;
      } else if (item.dropDown) {
        return item.dropDown.map((dropItem) => {
          if (!dropItem) {
            return null;
          } else {
            if (
              "/" + pageName === dropItem.uri &&
              String(pathname).search(dropItem.uri) > -1
            ) {
              return dropItem.heading;
            } else {
              return null;
            }
          }
        });
      } else {
        if (
          "/" + pageName === item.uri &&
          String(pathname).search(item.uri) > -1
        ) {
          return item.heading;
        } else {
          return null;
        }
      }
    });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-card/90 shadow-[0_1px_0_0_rgb(0_0_0_/_0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-card/75">
      <Modal
        visible={modalVisible}
        type="alert"
        text="Гарахдаа итгэлтэй байна уу?"
        onOk={modalHandleOK}
        onCancel={modalHandeleCancel}
      />

      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 md:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate text-regular font-semibold tracking-tight text-foreground">
            {headingOnChecker()}
          </p>
          <p className="truncate text-regular text-muted-foreground">
            Удирдлагын самбар
          </p>
        </div>
        <Separator orientation="vertical" className="hidden h-7 md:block" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 gap-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={signouBtnOnClick}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Гарах</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
