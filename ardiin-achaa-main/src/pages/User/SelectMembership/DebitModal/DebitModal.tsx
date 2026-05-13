// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import HaanLogo from "../../../../assets/haan-bank-logo.png";
import QPayLogo from "../../../../assets/qpay-logo.png";
import Axios from "../../../../Axios";
import { staticAssetUrl } from "../../../../utils/staticAssetUrl";
import Modal from "../../../../tools/Modal/Modal";


const DebitModal = ({
  id,
  membership,
  price,
  invoiceDescription,
  visible,
  onCancel,
}) => {
  const videoRef = useRef();

  const [invoiceData, setInvoiceData] = useState(null);
  const [token, setToken] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const [video, setVideo] = useState("");

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    videoRef.current?.load();

    Axios.get("/introBanner/getByType/homeVideo").then((res) => {
      setVideo(res.data.file_url);
    });

    if (isPaid) {
      const data = { id, membership };
      Axios.post(`/accounts/selectingMembership`, data).then((res) => {
        if (res.data.message === "success") {
          setMessageType("success");
          setMessageText(
            <label>
              Таны төлбөр төлөгдсөн байна. Таны эрх хэсэг хугацааны дараа
              нээгдэх тул <b>түр хүлээнэ үү.</b>
            </label>
          );
          setMessageVisible(true);
        } else {
          setMessageType("error");
          setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          setMessageVisible(true);
        }
      });
    }
  }, [video, isPaid, id, membership]);

  const messageHandleOK = () => {
    if (messageType === "success") {
      window.location.replace(`/user/${id}`);
    } else {
      setMessageVisible(false);
    }
  };

  const checkoutOnClick = () => {
    // const data = { id, membership };
    // Axios.post(`/accounts/selectingMembership`, data).then((res) => {
    //   if (res.data.message === "success") {
    //     setMessageType("success");
    //     setMessageText(
    //       <label>
    //         Таны төлбөр төлөгдсөн байна. Таны эрх хэсэг хугацааны дараа нээгдэх
    //         тул <b>түр хүлээнэ үү.</b>
    //       </label>
    //     );
    //     setMessageVisible(true);
    //   } else {
    //     setMessageType("error");
    //     setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
    //     setMessageVisible(true);
    //   }
    // });

    setMessageType("error");
    setMessageText(
      <label>
        Төлбөрөө төлсөн бол <b>"ТӨЛБӨР ШАЛГАХ"</b> товч дээр дарахыг анхаарна
        уу!
      </label>
    );
    setMessageVisible(true);

    Axios.post(
      "/pay/checkout",
      {
        price: price,
        invoiceDescription: invoiceDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setInvoiceData(res.data.invoiceData);
        setToken(res.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkPaymentOnClick = () => {
    Axios.post(
      "/pay/checkPayment",
      {
        invoiceId: invoiceData["invoice_id"],
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.data.paymentStatus === "PAID") {
          setIsPaid(true);
        } else {
          setIsPaid(false);

          setMessageType("error");
          setMessageText("Таны төлбөр төлөгдөөгүй байна.");
          setMessageVisible(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setInvoiceData(null);
        onCancel();
      }}
    >
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={messageHandleOK}
      />

      <div className="debitModal">
        <div className="debitModal__pay">
          <h3 className="debitModal__pay-title">Төлбөр төлөх</h3>

          <div className="debitModal__pay-payment">
            <p className="debitModal__pay-accNumber">
              <figure className="debitModal__pay-accNumber-fig">
                <img
                  className="debitModal__pay-accNumber-fig-logo"
                  src={staticAssetUrl(HaanLogo)}
                  alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
                />
              </figure>

              <b className="debitModal__pay-accNumber-text">
                <p>Хаан Банк</p>
                <p>50 42 84 46 10</p>
                <p>АРДЫН АЧАА ХХК</p>
              </b>
            </p>

            <button className="debitModal__pay-qpay" onClick={checkoutOnClick}>
              <figure className="debitModal__pay-qpay-fig">
                <img
                  className="debitModal__pay-qpay-fig-logo"
                  src={staticAssetUrl(QPayLogo)}
                  alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
                />
              </figure>

              <b className="debitModal__pay-qpay-text">QPAY төлбөрөө төлөх</b>
            </button>
          </div>

          {invoiceData && (
            <>
              <img
                className="debitModal__pay-qpayCode"
                src={`data:image/jpeg;base64,${invoiceData["qr_image"]}`}
                alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
              />

              <label className="debitModal__pay-alert">
                Төлбөрөө төлсөн бол <b>"ТӨЛБӨР ШАЛГАХ"</b> товч дээр дарна уу!
              </label>

              <button
                className="debitModal__pay-checkPayBtn"
                onClick={checkPaymentOnClick}
                disabled={invoiceData ? false : true}
              >
                төлбөр шалгах
              </button>
            </>
          )}
        </div>

        <did className="debitModal__tutorial">
          <h3 className="debitModal__tutorial-title">Төлбөр төлөх заавар</h3>

          <video
            className="debitModal__tutorial-video"
            ref={videoRef}
            controls
            loop
          >
            <source src={video} />
          </video>
        </did>
      </div>
    </Modal>
  );
};

export default DebitModal;
