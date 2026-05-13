// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import AdminTable from "../../AdminTools/Table/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const TRANSPORT_TYPES = [
  "Чингэлэг",
  "Вагон",
  "Агаарын тээвэр",
  "Усан онгоц",
];

const STATUS_OPTIONS = [
  "Чингэлэг сонгогдсон",
  "Ачилт хийгдэж байна",
  "Гаалийн хашаанд/Хятад/",
  "0 цэг дээр",
  "Хилээр нэвтэрсэн",
  "Гааль /Монгол/",
  "Дотоод Тээвэрлэлт",
  "Бараа хүлээлгэн өгөх явц",
  "Амжилттай биелсэн",
];

const REGULAR_TEXT = "text-regular";
const FIELD_LABEL_CLASS = REGULAR_TEXT;
const FIELD_CONTROL_CLASS = `h-12 ${REGULAR_TEXT}`;
const CARD_TITLE_CLASS = `${REGULAR_TEXT} font-semibold`;
const CARD_DESCRIPTION_CLASS = `${REGULAR_TEXT} text-muted-foreground`;
const HELPER_TEXT_CLASS = `${REGULAR_TEXT} text-muted-foreground`;

const Field = ({ id, label, children, className }) => (
  <div className={className || "grid gap-2"}>
    <Label htmlFor={id} className={FIELD_LABEL_CLASS}>
      {label}
    </Label>
    {children}
  </div>
);

const TransportModal = ({ accountID, id, visible, onCancel }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) {
      Axios.get(`/transport/getByID/${id}`).then((res) => {
        setData(res.data || {});
      });
    } else {
      setData({});
    }
  }, [id]);

  const packageColumns = [
    { Header: "Хэрэглэгчийн код", accessor: "container_code" },
    { Header: "Тээврийн төрөл", accessor: "transport_type" },
    {
      Header: "Чиглэл /хаанаас хаашаа/",
      accessor: (row) => `${row.location_from || ""} ${row.location_to || ""}`.trim(),
    },
    { Header: "Үнийн мэдээ /тонн/", accessor: "price_tn" },
    { Header: "Үнийн мэдээ /м3/", accessor: "price_metr" },
    {
      Header: "Тээвэрлэх хугацаа",
      accessor: (row) => `${row.date_from || ""} ${row.date_to || ""}`.trim(),
    },
    { Header: "Боломжит багтаамж", accessor: "capacity" },
    { Header: "Төлөв", accessor: "status" },
    {
      Header: "Бүртгэгдсэн огноо",
      accessor: "signed_date",
      Cell: ({ value }) => (value ? moment(value).format("YYYY/MM/DD") : "—"),
    },
  ];

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveOnClick = () => {
    const payload = {
      cargo_admin_id: accountID,
      ...data,
    };

    const routeEnd = id ? "update" : "insert";

    Axios.post(`/transport/${routeEnd}`, payload).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай хадгалагдлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  const drawerTitle = id
    ? data.container_code
      ? `${data.container_code} — тээврийн хэрэгсэл`
      : "Тээврийн хэрэгсэл"
    : "Шинэ тээвэр бүртгэх";

  const drawerDescription = id
    ? "Тээврийн мэдээлэл болон холбогдох ачаа барааны жагсаалт."
    : "Тээврийн хэрэгслийн мэдээллийг бөглөнө үү.";

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      presentation="drawer"
      title={drawerTitle}
      description={drawerDescription}
    >
      <div className="space-y-8">
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className={CARD_TITLE_CLASS}>Үндсэн мэдээлэл</CardTitle>
            <CardDescription className={CARD_DESCRIPTION_CLASS}>
              Тээврийн код, төрөл, чиглэл.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field id="container_code" label="Чингэлэгийн код">
              <Input
                id="container_code"
                name="container_code"
                className={FIELD_CONTROL_CLASS}
                value={data.container_code || ""}
                onChange={onChangeHandler}
                placeholder="Жишээ: CNTR-001"
              />
            </Field>

            <Field id="transport_type" label="Тээвэрлэлтийн төрөл">
              <Select
                id="transport_type"
                name="transport_type"
                className={FIELD_CONTROL_CLASS}
                value={data.transport_type || ""}
                onChange={onChangeHandler}
              >
                <option value="">Сонгох...</option>
                {TRANSPORT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>

            <Field id="location_from" label="Хаанаас">
              <Input
                id="location_from"
                name="location_from"
                className={FIELD_CONTROL_CLASS}
                value={data.location_from || ""}
                onChange={onChangeHandler}
              />
            </Field>

            <Field id="location_to" label="Хаашаа">
              <Input
                id="location_to"
                name="location_to"
                className={FIELD_CONTROL_CLASS}
                value={data.location_to || ""}
                onChange={onChangeHandler}
              />
            </Field>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className={CARD_TITLE_CLASS}>Үнэ, багтаамж</CardTitle>
            <CardDescription className={CARD_DESCRIPTION_CLASS}>
              Тонн, м³, хугацаа, төлөв.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field id="container_size" label="Хэмжээ">
              <Input
                id="container_size"
                name="container_size"
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={data.container_size ?? ""}
                onChange={onChangeHandler}
              />
            </Field>

            <Field id="tonnage" label="Даац">
              <Input
                id="tonnage"
                name="tonnage"
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={data.tonnage ?? ""}
                onChange={onChangeHandler}
              />
            </Field>

            <Field id="price_metr" label="м³ тутамд санал болгох үнэ">
              <Input
                id="price_metr"
                name="price_metr"
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={data.price_metr ?? ""}
                onChange={onChangeHandler}
              />
            </Field>

            <Field id="price_tn" label="Тонн тутамд санал болгох үнэ">
              <Input
                id="price_tn"
                name="price_tn"
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={data.price_tn ?? ""}
                onChange={onChangeHandler}
              />
            </Field>

            <Field id="status" label="Төлөв" className="grid gap-2 sm:col-span-2">
              <Select
                id="status"
                name="status"
                className={FIELD_CONTROL_CLASS}
                value={data.status || ""}
                onChange={onChangeHandler}
              >
                <option value="">Сонгох...</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              id="date_from"
              label="Тээвэрлэх хугацаа (хоногоор)"
              className="grid gap-2 sm:col-span-2"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  id="date_from"
                  name="date_from"
                  type="number"
                  className={cn(FIELD_CONTROL_CLASS, "sm:flex-1")}
                  value={data.date_from ?? ""}
                  onChange={onChangeHandler}
                />
                <span className={HELPER_TEXT_CLASS}>-ээс</span>
                <Input
                  id="date_to"
                  name="date_to"
                  type="number"
                  className={cn(FIELD_CONTROL_CLASS, "sm:flex-1")}
                  value={data.date_to ?? ""}
                  onChange={onChangeHandler}
                />
                <span className={HELPER_TEXT_CLASS}>хоног</span>
              </div>
            </Field>

            <Field
              id="capacity_tn"
              label="Боломжит багтаамж"
              className="grid gap-2 sm:col-span-2"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  id="capacity_tn"
                  name="capacity_tn"
                  type="number"
                  className={cn(FIELD_CONTROL_CLASS, "sm:flex-1")}
                  value={data.capacity_tn ?? ""}
                  onChange={onChangeHandler}
                />
                <span className={HELPER_TEXT_CLASS}>тн</span>
                <Input
                  id="capacity_metr"
                  name="capacity_metr"
                  type="number"
                  className={cn(FIELD_CONTROL_CLASS, "sm:flex-1")}
                  value={data.capacity_metr ?? ""}
                  onChange={onChangeHandler}
                />
                <span className={HELPER_TEXT_CLASS}>м³</span>
              </div>
            </Field>
          </CardContent>
        </Card>

        {id ? (
          <>
            <Separator />
            <Card className="border-border/80 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={CARD_TITLE_CLASS}>
                  Ачаа барааны жагсаалт
                </CardTitle>
                <CardDescription className={CARD_DESCRIPTION_CLASS}>
                  Энэ тээвэрт бүртгэлтэй ачаа барааны мөрүүд.
                </CardDescription>
              </CardHeader>
              <CardContent className="rounded-lg border border-border/60 bg-muted/10 p-0 sm:p-0">
                <AdminTable columns={packageColumns} disableAddBtn disableSearch disablePagination />
              </CardContent>
            </Card>
          </>
        ) : null}

        <div className="sticky bottom-0 -mx-6 flex flex-wrap items-center justify-end gap-3 border-t border-border/80 bg-card/95 px-6 py-4 backdrop-blur-sm">
          <Button
            type="button"
            variant="outline"
            className={`h-12 px-6 ${REGULAR_TEXT}`}
            onClick={() => onCancel(false)}
          >
            Болих
          </Button>
          <Button
            type="button"
            className={`h-12 px-6 ${REGULAR_TEXT}`}
            onClick={saveOnClick}
          >
            Хадгалах
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransportModal;
