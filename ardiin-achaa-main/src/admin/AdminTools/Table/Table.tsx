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

import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/table";
import { Button } from "@/components/ui/button";

/** react-table puts `key` on prop objects; React 18+ requires `key` on the element, not inside spread. */
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
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        {!disableAddBtn && (
          <Button type="button" onClick={() => showModalHandler(true)} className="gap-2">
            <RiAddLine className="h-4 w-4" aria-hidden />
            Нэмэх
          </Button>
        )}

        {!disableSearch && (
          <div className="ml-auto w-full max-w-md">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-white shadow-sm overflow-hidden">
        <ShadcnTable {...tableProps.rest}>
          <TableHeader className="bg-[#0B2545]">
            {headerGroups.map((headerGroup) => {
              const hg = splitKey(headerGroup.getHeaderGroupProps());
              return (
                <TableRow key={hg.key} {...hg.rest} className="hover:bg-[#0B2545] border-b-0">
                  {headerGroup.headers.map((column, index) => {
                    const colProps = splitKey(column.getHeaderProps(column.getSortByToggleProps()));
                    return (
                      <TableHead 
                        key={index} 
                        {...colProps.rest}
                        className="h-14 px-4 text-[13px] font-semibold text-white uppercase tracking-wider border-r border-white/10 last:border-r-0"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{column.render("Header")}</span>
                          {column.isSorted ? (
                            <span className="text-white/70">{column.isSortedDesc ? " 🔽" : " 🔼"}</span>
                          ) : (
                            ""
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody {...bodyProps.rest}>
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                const rp = splitKey(row.getRowProps());
                return (
                  <TableRow key={rp.key} {...rp.rest} className="transition-colors hover:bg-slate-50">
                    {row.cells.map((cell) => {
                      const cp = splitKey(cell.getCellProps());
                      return (
                        <TableCell 
                          key={cp.key} 
                          {...cp.rest}
                          className="h-14 px-4 py-3 text-[14px] text-slate-700 border-r border-border/60 last:border-r-0 font-medium align-middle"
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-regular text-slate-500">
                  Мэдээлэл олдсонгүй.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadcnTable>
      </div>

      {!disablePagination && pageOptions.length > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-regular text-muted-foreground">
            Хуудас <span className="font-semibold text-foreground">{pageIndex + 1}</span> / {pageOptions.length}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="h-9 px-4"
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="h-9 px-4"
            >
              {"Өмнөх"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="h-9 px-4"
            >
              {"Дараах"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="h-9 px-4"
            >
              {">>"}
            </Button>
          </div>
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
    membershipIcon = <RiCheckboxCircleLine size={20} className="text-green-600" />;
  } else {
    if (data.membership > 0 && data.membership < 4) {
      isMembership = true;
      membershipIcon = <RiNavigationFill size={20} className="text-blue-600" />;
    } else {
      membershipIcon = <RiCloseCircleLine size={20} className="text-destructive" />;
    }
  }

  const memberConfirmOnClick = () => {
    if (isMembership) {
      openConfirmAlert(data);
      setAlertMsgType("confirm");
    }
  };

  const partnerConfirmOnClick = () => {
    openConfirmAlert(data);
    setAlertMsgType("confirm");
  };

  let confBtnText = "";
  if (newStatusID === 3) {
    confBtnText = "зөвшөөрөх";
  } else if (newStatusID === 4) {
    confBtnText = "батлах";
  }

  const reqConfirmOnClick = () => {
    const DATA = { newStatusID: newStatusID, ...data };

    openConfirmAlert(DATA);
    setAlertMsgType("confirm");
  };

  return (
    <div
      className={`flex items-center gap-1.5 ${
        disableDeleteIcon || disableEditIcon ? "opacity-80" : ""
      }`}
    >
      {!disableEditIcon && (
        <Button
          variant="ghost"
          size="icon"
          key="edit"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => {
            setID(data.id);
            showModalHandler(true);
          }}
        >
          <BiEdit size={18} />
        </Button>
      )}

      {!disableDeleteIcon && (
        <Button
          variant="ghost"
          size="icon"
          key="delete"
          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            openDeleteAlert(data);
            setAlertMsgType("delete");
          }}
        >
          <BiTrash size={18} />
        </Button>
      )}

      {enableMemberConfirm && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          key="memberConfirm" 
          onClick={memberConfirmOnClick}
        >
          {membershipIcon}
        </Button>
      )}

      {enablePartnerConfirm && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
          key="partnerConfirm" 
          onClick={partnerConfirmOnClick}
        >
          <RiCheckboxCircleLine size={20} />
        </Button>
      )}

      {enablEpriceOffer && (
        <Button
          variant="link"
          size="sm"
          key="priceOffer"
          className="h-8 px-2 text-blue-600 hover:text-blue-700"
        >
          Үнийн санал
        </Button>
      )}

      {enableRequest && (
        <Button
          variant="link"
          size="sm"
          key="request"
          className="h-8 px-2 text-blue-600 hover:text-blue-700"
          onClick={() => {
            setID(data.id);
            showModalHandler(true);
          }}
        >
          Ачаа өгөх
        </Button>
      )}

      {enableInvoice && (
        <Button
          variant="link"
          size="sm"
          key="invoice"
          className="h-8 px-2 text-blue-600 hover:text-blue-700"
          onClick={() => {
            setID(data.id);
            setUserCode(data.user_code);
            showInvoiceHandler(true);
          }}
        >
          нэхэмжлэл
        </Button>
      )}

      {enableCheckBox && (
        <div key="checkbox" onClick={() => getChoseData(data)} className="cursor-pointer p-1">
          <CheckBox />
        </div>
      )}

      {newStatusID && (
        <Button 
          variant="outline" 
          size="sm" 
          key="reqConfirm" 
          className="h-8"
          onClick={() => reqConfirmOnClick(newStatusID)}
        >
          {confBtnText}
        </Button>
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
