// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

const REGULAR_TEXT = "text-regular";

let modalScrollLockCount = 0;

const lockBodyScroll = () => {
  if (modalScrollLockCount === 0) {
    document.body.style.overflow = "hidden";
  }
  modalScrollLockCount += 1;
};

const unlockBodyScroll = () => {
  modalScrollLockCount = Math.max(0, modalScrollLockCount - 1);
  if (modalScrollLockCount === 0) {
    document.body.style.overflow = "";
  }
};

type ModalType = "success" | "alert" | "error" | "";

type ModalProps = {
  children?: React.ReactNode;
  visible: boolean;
  type?: ModalType | string;
  text?: string;
  title?: string;
  description?: string;
  drawerClassName?: string;
  presentation?: "center" | "drawer";
  onOk?: () => void;
  onCancel?: (visible: boolean) => void;
  disableCloseBtn?: boolean;
};

const Modal = ({
  children,
  visible,
  type,
  text,
  title,
  description,
  drawerClassName,
  presentation = "center",
  onOk,
  onCancel,
  disableCloseBtn,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  /*~~~~~ MODAL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onCancel && modalRef.current === e.target) {
      onCancel(false);
    }
  };

  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (onCancel && e.key === "Escape" && visible) {
        setIsLoading(true);
        onCancel(false);
      }
    },
    [visible, onCancel]
  );

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    setIsLoading(false);
    lockBodyScroll();
    document.addEventListener("keydown", keyPress);

    return () => {
      document.removeEventListener("keydown", keyPress);
      unlockBodyScroll();
    };
  }, [visible, keyPress]);
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  const okHandler = () => {
    setIsLoading(true);
    if (onOk) {
      onOk();
    }
  };

  const noHandler = () => {
    setIsLoading(true);

    if (onCancel) {
      onCancel(false);
    }
  };

  const checkLoading = (text) => {
    let val = null;

    if (isLoading) {
      val = <ButtonSpinner />;
    } else {
      val = text;
    }

    return val;
  };

  let BUTTON = null;
  switch (type) {
    case "success":
      BUTTON = (
        <Button type="button" onClick={okHandler}>
          {checkLoading("Ойлголоо")}
        </Button>
      );
      break;
    case "alert":
      BUTTON = checkLoading(
        <div className="modal__btnContainer flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={okHandler}>
            Тийм
          </Button>
          <Button type="button" variant="outline" onClick={noHandler}>
            Үгүй
          </Button>
        </div>
      );
      break;
    case "error":
      BUTTON = (
        <Button type="button" variant="destructive" onClick={okHandler}>
          {checkLoading("Ойлголоо")}
        </Button>
      );
      break;
    default:
      BUTTON = null;
  }

  if (!visible) return null;

  if (children && presentation === "drawer") {
    return (
      <div
        className="fixed inset-0 z-[9999] flex bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        ref={modalRef}
        onClick={closeOnClick}
      >
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-border/80 bg-card shadow-2xl transition-transform duration-300 ease-out md:max-w-2xl lg:max-w-3xl",
            drawerClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/80 bg-muted/20 px-6 py-5">
              <div className="min-w-0 space-y-1">
                <h2 className={`${REGULAR_TEXT} font-semibold tracking-tight text-foreground`}>
                  {title || "Дэлгэрэнгүй"}
                </h2>
                {description ? (
                  <p className={`${REGULAR_TEXT} text-muted-foreground`}>{description}</p>
                ) : null}
              </div>
              {!disableCloseBtn && onCancel ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto gap-2 px-3 py-2 text-regular"
                  onClick={() => onCancel(false)}
                >
                  <CgClose className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                  <span>Хаах</span>
                </Button>
              ) : null}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  if (children) {
    return (
      <div className="modal" ref={modalRef} onClick={closeOnClick}>
        <div className="modal__normal" onClick={(e) => e.stopPropagation()}>
          {!disableCloseBtn && onCancel ? (
            <button
              type="button"
              className="modal__normal-closeBtn"
              onClick={() => onCancel(false)}
              aria-label="Хаах"
            >
              <CgClose />
            </button>
          ) : null}
          <div className="modal__normal-content">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal" ref={modalRef} onClick={closeOnClick}>
      <div className={`modal__message modal__message--${type}`}>
        <p className="modal__message-text">{text}</p>
        {BUTTON}
      </div>
    </div>
  );
};

export default Modal;
