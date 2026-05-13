// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios";
import Modal from "../../../../tools/Modal/Modal";
import { Button } from "@/components/ui/button";


const CompanyProfileModal = ({ accountID, visible, onCancel }) => {
  const [profile, setProfile] = useState("");
  const [pdfFile, setPdfFile] = useState();

  const [isCrossRoad, setIsCrossRoad] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    Axios.get(`/partnerCrossRoad/getByAdminID/${accountID}`).then((res) => {
      if (res.data) {
        setIsCrossRoad(true);
        setProfile(res.data.profile_file);
      } else {
        setIsCrossRoad(false);

        Axios.get(`/partner/getByCargoAdminID/${accountID}`).then((res) => {
          setProfile(res.data.profile_file);
        });
      }
    });
  }, [accountID]);

  const handleFileChanger = (e) => {
    let fileReader = new FileReader();
    let uploadingFile = e.target.files[0];

    fileReader.onloadend = () => {
      setPdfFile(uploadingFile);
    };

    if (uploadingFile) {
      fileReader.readAsDataURL(uploadingFile);
    }
  };

  const removeMsgHandleOK = () => {
    Axios.post(`/partner/${isCrossRoad ? "cr/" : ""}removeCompanyPDF`, {
      adminID: accountID,
    }).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай устлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  const saveOnClick = () => {
    const formData = new FormData();

    formData.append("adminID", accountID);
    formData.append("profile", profile);
    formData.append("pdfFile", pdfFile);

    Axios.post(
      `/partner/${isCrossRoad ? "cr/" : ""}uploadCompanyPDF`,
      formData
    ).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай хадгалагдлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <Modal
        visible={messageVisible}
        type="alert"
        text="Устгахдаа итгэлтэй байна уу?"
        onOk={removeMsgHandleOK}
        onCancel={() => setMessageVisible(false)}
      />

      <div className="companyProfileModal">
        <h2 className="companyProfileModal__heading">
          Компанийн танилцуулга оруулах
        </h2>

        <div className="companyProfileModal__uploadPDF">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChanger}
          />

          {profile ? (
            <iframe
              className="companyProfileModal__uploadPDF-viewer"
              title="pdf"
              // src={`${profile}#toolbar=0`}
              src={profile}
            />
          ) : (
            <b>Танилцуулга хадгалагдаагүй байна</b>
          )}
        </div>

        <div className="companyProfileModal__btnContainer">
          {profile && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => setMessageVisible(true)}
            >
              Устгах
            </Button>
          )}

          <Button type="button" onClick={saveOnClick}>
            Хадгалах
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompanyProfileModal;
