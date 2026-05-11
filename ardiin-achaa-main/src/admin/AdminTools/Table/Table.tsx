// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import NoImage from "../../../assets/no-image.jpg";
import NoFile from "../../../assets/no-file.jpg";
import Axios from "../../../Axios";

import { BiTrash, BiEdit } from "react-icons/bi";
import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiNavigationFill,
  RiCloseCircleLine,
} from "react-icons/ri";

import GlobalFilter from "./GlobalFilter";
import Modal from "../../../tools/Modal/Modal";
import CheckBox from "../../../tools/CheckBox/CheckBox";


function RenderTable({
  data,
  columns,
  rowSize,
  disableAddBtn,
  showModalHandler,
  showInvoiceHandler,
  disableSearch,
  disablePagination,
}) {
  const TableInstance = useTable(
    {
      data,
      columns,
      initialState: { pageSize: rowSize ? rowSize : 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
  } = TableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <div className="rcTable">
      <div className="rcTable__heading">
        {disableAddBtn ? (
          <div />
        ) : (
          <button onClick={() => showModalHandler(true)}>
            <RiAddLine size={18} />
            Нэмэх
          </button>
        )}

        {disableSearch ? (
          <div />
        ) : (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
      </div>

      <table {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index}>
                  {column.render("Header")}

                  {/* <div className="rcTable__header-search">
                    {column.canFilter ? column.render("Filter") : null}
                  </div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {disablePagination || (
        <div className="rcTable__pagination">
          <span className="rcTable__pagination-text">
            Хуудас{" "}
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>
          </span>

          <button
            className="rcTable__pagination-btn1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          <button
            className="rcTable__pagination-btn2"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {"< Өмнөх"}
          </button>
          <button
            className="rcTable__pagination-btn2"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            {"Дараах >"}
          </button>
          <button
            className="rcTable__pagination-btn1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}

function memberConfirmHandler({ data, mainAxios, openSuccess, openError }) {
  const URL = mainAxios + "/memberConfirm";

  Axios.post(URL, data)
    .then((res) => {
      if (res.data.message === "success") {
        openSuccess();
      } else {
        openError();
      }
    })
    .catch(() => {
      openError();
    });
}
function partnerConfirmHandler({ data, mainAxios, openSuccess, openError }) {
  const URL = mainAxios + "/partnerConfirm";

  Axios.post(URL, data)
    .then((res) => {
      if (res.data.message === "success") {
        openSuccess();
      } else {
        openError();
      }
    })
    .catch(() => {
      openError();
    });
}

function reqConfirmHandler({ data, mainAxios, openSuccess, openError }) {
  const URL = mainAxios + "/changeStatus";
  const packageID = data.id;

  Axios.post(URL, { packageID, statusID: data.newStatusID })
    .then((res) => {
      if (res.data.message === "success") {
        openSuccess();
      } else {
        openError();
      }
    })
    .catch(() => {
      openError();
    });
}

function deleteHandler({ ID, mainAxios, openSuccess, openError }) {
  const URL = mainAxios + "/delete/" + ID;

  Axios.delete(URL).then((res) => {
    if (res.data.message === "success") {
      openSuccess();
    } else {
      openError();
    }
  });
}

function renderActions({
  setID,
  setUserCode,
  data,
  showModalHandler,
  showInvoiceHandler,
  getChoseData,
  disableDeleteIcon,
  disableEditIcon,
  enableMemberConfirm,
  enablePartnerConfirm,
  enablEpriceOffer,
  enableRequest,
  enableInvoice,
  enableCheckBox,
  newStatusID,
  openConfirmAlert,
  openDeleteAlert,
  setAlertMsgType,
}) {
  let membershipIcon = null;
  let isMembership = false;
  if (data.confirm) {
    membershipIcon = <RiCheckboxCircleLine size={23} color="green" />;
  } else {
    if (data.membership > 0 && data.membership < 4) {
      isMembership = true;
      membershipIcon = <RiNavigationFill size={23} color="blue" />;
    } else {
      membershipIcon = <RiCloseCircleLine size={23} color="red" />;
    }
  }

  const memberConfirmOnClick = () => {
    if (isMembership) {
      openConfirmAlert(data);
      setAlertMsgType("confirm");
    }
  };

  // let partnerIcon = null;
  // let isPartner = false;
  // if (data.confirm) {
  //   partnerIcon = <RiCheckboxCircleLine size={23} color="green" />;
  // } else {
  //   isPartner = true;
  //   partnerIcon = <RiNavigationFill size={23} color="blue" />;
  // }

  const partnerConfirmOnClick = () => {
    openConfirmAlert(data);
    setAlertMsgType("confirm");
  };

  let confBtnText = "";
  if (newStatusID === 3) {
    confBtnText = <p>зөвшөөрөх</p>;
  } else if (newStatusID === 4) {
    confBtnText = <p>батлах</p>;
  }

  const reqConfirmOnClick = () => {
    const DATA = { newStatusID: newStatusID, ...data };

    openConfirmAlert(DATA);
    setAlertMsgType("confirm");
  };

  return (
    <div
      className={`rcTable__actionsContainer ${
        disableDeleteIcon || disableEditIcon
          ? "rcTable__actionsContainer--disabledButton"
          : null
      }`}
    >
      {disableEditIcon || (
        <button
          key="edit"
          onClick={() => {
            setID(data.id);
            showModalHandler(true);
          }}
        >
          <BiEdit size={23} />
        </button>
      )}

      {disableDeleteIcon || (
        <button
          key="delete"
          onClick={() => {
            openDeleteAlert(data);
            setAlertMsgType("delete");
          }}
        >
          <BiTrash size={23} color="red" />
        </button>
      )}

      {enableMemberConfirm && (
        <button key="memberConfirm" onClick={memberConfirmOnClick}>
          {membershipIcon}
        </button>
      )}

      {enablePartnerConfirm && (
        <button key="partnerConfirm" onClick={partnerConfirmOnClick}>
          <RiCheckboxCircleLine size={23} color="orange" />
        </button>
      )}

      {enablEpriceOffer && (
        <button
          key="request"
          style={{
            cursor: "pointer",
            borderRadius: 10,
            color: "blue",
          }}
          // onClick={() => {
          //   setID(data.id);
          //   setUserCode(data.user_code);
          //   showInvoiceHandler(true);
          // }}
        >
          <p>Үнийн санал</p>
        </button>
      )}

      {enableRequest && (
        <button
          key="request"
          style={{
            cursor: "pointer",
            borderRadius: 10,
            color: "blue",
          }}
          onClick={() => {
            setID(data.id);
            showModalHandler(true);
          }}
        >
          <p>Ачаа өгөх</p>
        </button>
      )}

      {enableInvoice && (
        <button
          key="invoice"
          style={{
            cursor: "pointer",
            borderRadius: 10,
            color: "blue",
          }}
          onClick={() => {
            setID(data.id);
            setUserCode(data.user_code);
            showInvoiceHandler(true);
          }}
        >
          <p>нэхэмжлэл</p>
        </button>
      )}

      {enableCheckBox && (
        <button key="checkbox" onClick={() => getChoseData(data)}>
          <CheckBox />
        </button>
      )}

      {newStatusID && (
        <button key="reqConfirm" onClick={() => reqConfirmOnClick(newStatusID)}>
          {confBtnText}
        </button>
      )}
    </div>
  );
}

const Table = ({
  mainAxios,
  axiosURL,
  columns,
  rowSize,
  disableAddBtn,
  setID,
  setUserCode,
  showModalHandler,
  showInvoiceHandler,
  getChoseData,
  disableSearch,
  disablePhoto,
  disableActions,
  disableDeleteIcon,
  disableEditIcon,
  disablePagination,
  enableMemberConfirm,
  enablePartnerConfirm,
  enablEpriceOffer,
  enableRequest,
  enableInvoice,
  enableCheckBox,
  newStatusID,
}) => {
  const [DATA, setDATA] = useState([]);
  const [choseData, setChoseData] = useState([]);

  const [showMsg, setShowMsg] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msgText, setMsgText] = useState("");
  const [alertMsgType, setAlertMsgType] = useState("");

  if (!mainAxios) {
    mainAxios = axiosURL;
  }

  const URL = axiosURL + "/getAll";

  useEffect(() => {
    Axios.get(URL).then((res) => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i] = {
            ...res.data[i],
            photo: (
              <img
                style={{ width: 100 }}
                src={res.data[i].image ? res.data[i].image : NoImage}
                alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
                onError={(event) => {
                  event.target.onerror = null;
                  event.target.src = NoFile;
                }}
              />
            ),
            number: i + 1,
            actions: renderActions({
              setID,
              setUserCode,
              data: res.data[i],
              showModalHandler,
              showInvoiceHandler,
              getChoseData,
              disableDeleteIcon,
              disableEditIcon,
              enableMemberConfirm,
              enablePartnerConfirm,
              enablEpriceOffer,
              enableRequest,
              enableInvoice,
              enableCheckBox,
              newStatusID,
              openConfirmAlert,
              openDeleteAlert,
              setAlertMsgType,
            }),
          };
        }

        setDATA(res.data);
      }
    });
  }, [
    URL,
    setID,
    setUserCode,
    showModalHandler,
    showInvoiceHandler,
    newStatusID,
    disablePhoto,
    disableDeleteIcon,
    disableEditIcon,
    enableMemberConfirm,
    enablePartnerConfirm,
    enablEpriceOffer,
    enableRequest,
    enableInvoice,
    enableCheckBox,
    getChoseData,
  ]);

  const COLUMNS = useMemo(() => {
    let changedCol = [];

    if (columns) {
      if (disableActions) {
        if (disablePhoto) {
          changedCol = [
            {
              Header: "№",
              accessor: "number",
            },
            ...columns,
          ];
        } else {
          changedCol = [
            {
              Header: "№",
              accessor: "number",
            },
            {
              Header: "Зураг",
              accessor: "photo",
            },
            ...columns,
          ];
        }
      } else {
        if (disablePhoto) {
          changedCol = [
            {
              Header: "№",
              accessor: "number",
            },
            ...columns,
            {
              Header: "Үйлдэл",
              accessor: "actions",
              disableSortBy: true,
            },
          ];
        } else {
          changedCol = [
            {
              Header: "№",
              accessor: "number",
            },
            {
              Header: "Зураг",
              accessor: "photo",
            },
            ...columns,
            {
              Header: "Үйлдэл",
              accessor: "actions",
              disableSortBy: true,
            },
          ];
        }
      }
    }

    return changedCol.map((item) => {
      return item;
    });
  }, [columns, disablePhoto, disableActions]);

  const openConfirmAlert = (data) => {
    setChoseData(data);

    setMsgType("alert");
    setMsgText("Итгэлтэй байна уу?");
    setShowMsg(true);
  };
  const openDeleteAlert = (data) => {
    setChoseData(data);

    setMsgType("alert");
    setMsgText("Та устгахдаа итгэлтэй байна уу?");
    setShowMsg(true);
  };

  const openSuccess = () => {
    setMsgType("success");
    setMsgText(
      enableMemberConfirm || newStatusID || enablePartnerConfirm || newStatusID
        ? "Амжилттай"
        : "Амжилттай устгагдлаа"
    );
    setShowMsg(true);
  };

  const openError = () => {
    setMsgType("error");
    setMsgText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
    setShowMsg(true);
  };

  const modalHandleOK = () => {
    if (msgType === "success" || msgType === "error") {
      window.location.reload();
    } else if (msgType === "alert") {
      setShowMsg(false);

      if (alertMsgType === "delete") {
        deleteHandler({ ID: choseData.id, mainAxios, openSuccess, openError });
      } else if (alertMsgType === "confirm") {
        if (enableMemberConfirm) {
          memberConfirmHandler({
            data: choseData,
            mainAxios,
            openSuccess,
            openError,
          });
        } else if (enablePartnerConfirm) {
          partnerConfirmHandler({
            data: choseData,
            mainAxios,
            openSuccess,
            openError,
          });
        } else if (newStatusID) {
          reqConfirmHandler({
            data: choseData,
            mainAxios,
            openSuccess,
            openError,
          });
        } else {
          setShowMsg(false);
        }
      }
    }
  };

  return (
    <>
      <RenderTable
        data={DATA}
        columns={COLUMNS}
        rowSize={rowSize}
        disableAddBtn={disableAddBtn}
        showModalHandler={showModalHandler}
        showInvoiceHandler={showInvoiceHandler}
        disableSearch={disableSearch}
        disablePagination={disablePagination}
      />

      <Modal
        type={msgType}
        text={msgText}
        visible={showMsg}
        onOk={() => modalHandleOK()}
        onCancel={() => setShowMsg(false)}
      />
    </>
  );
};

export default Table;
