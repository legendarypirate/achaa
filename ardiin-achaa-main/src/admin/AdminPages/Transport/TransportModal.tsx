// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "../../../Axios";
import Table from "../../AdminTools/Table/Table";
import Modal from "../../../tools/Modal/Modal";


const TransportModal = ({ accountID, id, visible, onCancel }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) {
      Axios.get(`/transport/getByID/${id}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [id]);

  const column = [
    {
      Header: "Хэрэглэгчийн код",
      accessor: "container_code",
    },
    {
      Header: "Тээврийн төрөл",
      accessor: "transport_type",
    },
    {
      Header: "Чиглэл /хаанаас хаашаа/",
      accessor: (data) => data.location_from + " " + data.location_to,
    },
    {
      Header: "Үнийн мэдээ /тонн/",
      accessor: "price_tn",
    },
    {
      Header: "Үнийн мэдээ /м3/",
      accessor: "price_metr",
    },
    {
      Header: "Тээвэрлэх хугацаа",
      accessor: (data) => data.date_from + " " + data.date_to,
    },
    {
      Header: "Боломжит багтаамж",
      accessor: "capacity",
    },
    {
      Header: "Төлөв",
      accessor: "status",
    },
    {
      Header: "Бүртгэгдсэн огноо",
      accessor: "signed_date",
      Cell: ({ value }) => {
        return moment(value).format("YYYY/MM/DD");
      },
    },
  ];

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveOnClick = () => {
    const DATA = {
      cargo_admin_id: accountID,
      ...data,
    };

    let routeEnd = "";
    if (id) {
      routeEnd = "update";
    } else {
      routeEnd = "insert";
    }

    if (routeEnd) {
      Axios.post(`/transport/${routeEnd}`, DATA).then((res) => {
        if (res.data.message === "success") {
          alert("Амжилттай хадгалагдлаа.");
          window.location.reload();
        } else {
          alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          window.location.reload();
        }
      });
    } else {
      alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
      window.location.reload();
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="transportModal">
        <div className="transportModal__header">
          {data.container_code} дугаартай Тээврийн хэрэгслийн дэлгэрэнгүй
        </div>

        <div className="transportModal__body">
          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">
              Чингэлэгийн код
            </div>
            <input
              className="transportModal__body__part-input"
              name="container_code"
              value={data.container_code}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">
              Тээвэрлэлтийн төрөл
            </div>
            <select
              className="transportModal__body__part-input"
              name="transport_type"
              value={data.transport_type}
              onChange={onChangeHandler}
            >
              <option value="">Сонгох...</option>
              <option value="Чингэлэг">Чингэлэг</option>
              <option value="Вагон">Вагон</option>
              <option value="Агаарын тээвэр">Агаарын тээвэр</option>
              <option value="Усан онгоц">Усан онгоц</option>
            </select>
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">Хаанаас</div>
            <input
              className="transportModal__body__part-input"
              name="location_from"
              value={data.location_from}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">Хаашаа</div>
            <input
              className="transportModal__body__part-input"
              name="location_to"
              value={data.location_to}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">Хэмжээ</div>
            <input
              className="transportModal__body__part-input"
              name="container_size"
              type="number"
              value={data.container_size}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">Даац</div>
            <input
              className="transportModal__body__part-input"
              name="tonnage"
              type="number"
              value={data.tonnage}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">
              м³ тутамд санал болгох үнэ
            </div>
            <input
              className="transportModal__body__part-input"
              name="price_metr"
              type="number"
              value={data.price_metr}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">Төлөв</div>
            <select
              className="transportModal__body__part-input"
              name="status"
              value={data.status}
              onChange={onChangeHandler}
            >
              <option value="">Сонгох...</option>
              <option value="Чингэлэг сонгогдсон">Чингэлэг сонгогдсон</option>
              <option value="Ачилт хийгдэж байна">Ачилт хийгдэж байна</option>
              <option value="Гаалийн хашаанд/Хятад/">
                Гаалийн хашаанд /Хятад/
              </option>
              <option value="0 цэг дээр">0 цэг дээр</option>
              <option value="Хилээр нэвтэрсэн">Хилээр нэвтэрсэн</option>
              <option value="Гааль /Монгол/">Гааль /Монгол/</option>
              <option value="Дотоод Тээвэрлэлт">Дотоод Тээвэрлэлт</option>
              <option value="Бараа хүлээлгэн өгөх явц">
                Бараа хүлээлгэн өгөх явц
              </option>
              <option value="Амжилттай биелсэн">Амжилттай биелсэн</option>
            </select>
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">
              Тонн тутамд санал болгох үнэ
            </div>
            <input
              className="transportModal__body__part-input"
              name="price_tn"
              type="number"
              value={data.price_tn}
              onChange={onChangeHandler}
            />
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">
              Тээвэрлэх хугацаа /хоногоор/
            </div>
            <input
              className="transportModal__body__part-input2"
              name="date_from"
              type="number"
              value={data.date_from}
              onChange={onChangeHandler}
            />
            -ээс
            <input
              className="transportModal__body__part-input3"
              name="date_to"
              type="number"
              value={data.date_to}
              onChange={onChangeHandler}
            />
            хоног
          </div>

          <div className="transportModal__body__part">
            <div className="transportModal__body__part-title">
              Боломжит багтаамж
            </div>
            <input
              className="transportModal__body__part-input2"
              name="capacity_tn"
              type="number"
              value={data.capacity_tn}
              onChange={onChangeHandler}
            />
            тн
            <input
              className="transportModal__body__part-input3"
              name="capacity_metr"
              type="number"
              value={data.capacity_metr}
              onChange={onChangeHandler}
            />
            м3
          </div>
        </div>

        <div className="transportModal__button">
          <button className="transportModal__button-save" onClick={saveOnClick}>
            Хадгалах
          </button>
        </div>

        {id && (
          <>
            <div className="transportModal__header">
              Энэ тээвэрт бүртгэлтэй байгаа ачаа барааны жагсаалт
            </div>

            <Table columns={column} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default TransportModal;
