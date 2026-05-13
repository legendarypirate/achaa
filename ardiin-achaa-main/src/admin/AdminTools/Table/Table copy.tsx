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
import { staticAssetUrl } from "../../../utils/staticAssetUrl";

function splitKey(props) {
  if (!props) return { key: undefined, rest: {} };
  const { key, ...rest } = props;
  return { key, rest };
}

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

  const tableProps = splitKey(getTableProps());
  const bodyProps = splitKey(getTableBodyProps());

  return (
    <div className="rcTable">
      <div className="rcTable__heading">
        {disableAddBtn ? (
          <div />
        ) : (
          <button onClick={() => showModalHandler(
            showInvoiceHandler,true)}>
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

      <table key={tableProps.key} {...tableProps.rest}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const hg = splitKey(headerGroup.getHeaderGroupProps());
            return (
              <tr key={hg.key} {...hg.rest}>
                {headerGroup.headers.map((column, index) => (
                  <th key={index}>
                    <div className="rcTable__header-title">
                      {column.render("Header")}
                    </div>
                    <div className="rcTable__header-search">
                      {/* {column.canFilter ? column.render("Filter") : null} */}
                    </div>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody key={bodyProps.key} {...bodyProps.rest}>
          {page.map((row) => {
            prepareRow(row);
            const rp = splitKey(row.getRowProps());

            return (
              <tr key={rp.key} {...rp.rest}>
                {row.cells.map((cell) => {
                  const cp = splitKey(cell.getCellProps());
                  return (
                    <td key={cp.key} {...cp.rest}>
                      {cell.render("Cell")}
                    </td>
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
  setId,
  data,
  showModalHandler,
  showInvoiceHandler,
  getChoseData,
  disableDeleteIcon,
  disableEditIcon,
  enableMemberConfirm,
  enableRequest,
  enablePackRequest,
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
            setID(
              setId,data.id);
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

      {enableRequest && (
        <button
          key="request"
          style={{
            cursor: "pointer",
            borderRadius: 10,
            color: "blue",
          }}
          onClick={() => {
            setID(
              setId,data.id);
            showModalHandler(true);
          }}
        >
          <p>Ачаа өгөх</p>
        </button>
      )}

      {enablePackRequest && (
        <button
          key="request"
          style={{
            cursor: "pointer",
            borderRadius: 10,
            color: "blue",
          }}
          onClick={() => {
            setID(
              setId,data.id);
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
  setId,
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
  enableRequest,
  enablePackRequest,
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
                src={
                  res.data[i].image
                    ? res.data[i].image
                    : staticAssetUrl(NoImage)
                }
                alt="no file"
                onError={(event) => {
                  const el = event.currentTarget;
                  el.onerror = null;
                  el.src = staticAssetUrl(NoFile);
                }}
              />
            ),
            number: i + 1,
            actions: renderActions({
              setID,
              setId,
              data: res.data[i],
              showModalHandler,
              showInvoiceHandler,
              getChoseData,
              disableDeleteIcon,
              disableEditIcon,
              enableMemberConfirm,
              enableRequest,
              enablePackRequest,
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
    setId,
    showModalHandler,
    showInvoiceHandler,
    newStatusID,
    disablePhoto,
    disableDeleteIcon,
    disableEditIcon,
    enableMemberConfirm,
    enableRequest,
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
    setMsgType("alert");
    setMsgText("Итгэлтэй байна уу?");
    setChoseData(data);
    setShowMsg(true);
  };
  const openDeleteAlert = (data) => {
    setMsgType("alert");
    setMsgText("Та устгахдаа итгэлтэй байна уу?");
    setChoseData(data);
    setShowMsg(true);
  };

  const openSuccess = () => {
    setMsgType("success");
    setMsgText(
      enableMemberConfirm || newStatusID
        ? "Амжилттай."
        : "Амжилттай устгагдлаа."
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
