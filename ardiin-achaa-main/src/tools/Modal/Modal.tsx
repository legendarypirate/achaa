// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

type ModalType = "success" | "alert" | "error" | "";

type ModalProps = {
  children?: React.ReactNode;
  visible: boolean;
  type: ModalType | string;
  text?: string;
  onOk?: () => void;
  onCancel?: (visible: boolean) => void;
  disableCloseBtn?: boolean;
};

const Modal = ({
  children,
  visible,
  type,
  text,
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
    if (visible) {
      setIsLoading(false);
    }

    document.addEventListener("keydown", keyPress);

    return () => document.removeEventListener("keydown", keyPress);
  }, [children, visible, keyPress]);
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
        <button
          className="modal__button modal__button--ok btn-small"
          onClick={okHandler}
        >
          {checkLoading("Ойлголоо")}
        </button>
      );
      break;
    case "alert":
      BUTTON = checkLoading(
        <div className="modal__btnContainer">
          <button
            className="modal__button modal__button--yes btn-small"
            onClick={okHandler}
          >
            Тийм
          </button>
          <button
            className="modal__button modal__button--no btn-small"
            onClick={noHandler}
          >
            Үгүй
          </button>
        </div>
      );
      break;
    case "error":
      BUTTON = (
        <button
          className="modal__button modal__button--error btn-small"
          onClick={okHandler}
        >
          {checkLoading("Ойлголоо")}
        </button>
      );
      break;
    default:
      BUTTON = null;
  }

  return visible ? (
    <div className="modal" ref={modalRef} onClick={closeOnClick}>
      {children ? (
        <div className="modal__normal">
          {disableCloseBtn || (
            <button
              className="modal__normal-closeBtn"
              onClick={() => onCancel(false)}
            >
              <CgClose />
            </button>
          )}

          <div className="modal__normal-content">{children}</div>
        </div>
      ) : (
        <div className={`modal__message modal__message--${type}`}>
          <p className="modal__message-text">{text}</p>

          {BUTTON}
        </div>
      )}
    </div>
  ) : null;
};

export default Modal;
