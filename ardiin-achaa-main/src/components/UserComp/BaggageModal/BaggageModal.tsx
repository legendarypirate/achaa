// @ts-nocheck
import React, { useEffect, useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import moment from "moment";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../../admin/AdminTools/FileUploader/FileUploader";


const BaggageModal = ({ id, account_id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [pinFile, setPinFile] = useState();

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    if (id) {
      Axios.get(`/packages/isFree/${id}`).then((res) => {
        if (res.data === true) {
          Axios.get(`/packages/free/getByID/${id}`).then((res) => {
            setData(res.data);
          });
        } else {
          Axios.get(`/packages/getByID/${id}`).then((res) => {
            setData(res.data);
          });
        }
      });
    } else {
      setData({});
    }
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const modalHandleOK = () => {
    if (id) {
      window.location.reload();
    } else {
      window.location.replace(`/user/${account_id}/pack`);
    }
  };

  const saveOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", [id]);
    formData.append("account_id", [account_id]);
    formData.append("status_id", [data.status_id]);
    formData.append("package_name", [data.package_name]);
    formData.append("package_category", [data.package_category]);
    formData.append("bundle_sort", [data.bundle_sort]);
    formData.append("total_piece", [data.total_piece]);
    formData.append("pinned_file", [data.pinned_file]);
    formData.append("pinFile", pinFile);
    formData.append("come_from", [data.come_from]);
    formData.append("go_to", [data.go_to]);
    formData.append("weight_metr", [data.weight_metr]);
    formData.append("loaded_place", [data.loaded_place]);
    formData.append("addition", [data.addition]);

    if (id) {
      Axios.post("/packages/update", formData).then((res) => {
        if (res.data.message === "success") {
          setMessageType("success");
          setMessageText("Амжилттай хадгалагдлаа.");
          setMessageVisible(true);
        } else {
          setMessageType("error");
          setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          setMessageVisible(true);
        }
      });
    } else {
      Axios.post("/packages/insert", formData).then((res) => {
        if (res.data.message === "success") {
          setMessageType("success");
          setMessageText("Амжилттай хадгалагдлаа.");
          setMessageVisible(true);
        } else {
          setMessageType("error");
          setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          setMessageVisible(true);
        }
      });
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={modalHandleOK}
      />

      <form className="baggage" onSubmit={saveOnClick}>
        <h2 className="baggage__heading">
          Aчаа{id ? "ны мэдээлэл" : " бүртгүүлэх"}
        </h2>

        <div className="baggage__content">
          <div className="baggage__content-cell">
            {id && (
              <div className="baggage__content-cell-infos">
                <p>
                  <b>Бүртгэгдсэн огноо:</b>
                  {moment(data.signed_date).format("YYYY/MM/DD")}
                </p>
                {data.status_id > 1 && (
                  <p>
                    <b>Хариуцсан компани:</b>
                    {data.cargo_name}
                  </p>
                )}
              </div>
            )}

            <div className="baggage__content-cell-input">
              <label>Aчааны нэр</label>
              <input
                name="package_name"
                value={data.package_name}
                onChange={onChangeHandler}
              />
            </div>

            <div className="baggage__content-cell-input">
              <label>Aчааны ангилал</label>
              <select
                name="package_category"
                value={data.package_category}
                onChange={onChangeHandler}
              >
                <option value="">Сонгох...</option>
                <option value="Ургамлын гаралтай бүтээгдэхүүн">
                  Ургамлын гаралтай бүтээгдэхүүн
                </option>
                <option value="Хүнсний бэлэн бүтээгдэхүүн согтууруулах болон согтууруулах бус ундаа,цуу, тамхи болон тамхи орлуулагч">
                  Хүнсний бэлэн бүтээгдэхүүн согтууруулах болон согтууруулах бус
                  ундаа,цуу, тамхи болон тамхи орлуулагч
                </option>
                <option value="Химийн ба түүнтэй холбоотой үйлдвэрийн бүтээгдэхүүн">
                  Химийн ба түүнтэй холбоотой үйлдвэрийн бүтээгдэхүүн
                </option>
                <option value="Арьс ширэн түүхий эд, боловсруулсан арьс шир, үслэг арьс ба тэдгээрээр хийсэн эдлэл,аяны хэрэгсэл, төстэй уут сав">
                  Арьс ширэн түүхий эд, боловсруулсан арьс шир, үслэг арьс ба
                  тэдгээрээр хийсэн эдлэл,аяны хэрэгсэл, төстэй уут сав
                </option>
                <option value="Нэхмэлийн материал ба нэхмэл эдлэл">
                  Нэхмэлийн материал ба нэхмэл эдлэл
                </option>
                <option value="Мод ба модон эдлэл, модны нүүрс, үйс үйсэн эдлэл, сүрлэн сийрсэн буюу сүлжих бусад материалаар хийсэн зүйлс">
                  Мод ба модон эдлэл, модны нүүрс, үйс үйсэн эдлэл, сүрлэн
                  сийрсэн буюу сүлжих бусад материалаар хийсэн зүйлс
                </option>
                <option value="Гутал, малгай, шүхэр, нарны халхавч, таяг, тулгуур, шилбүүр, ташуур болон тэдгээрийн эд анги, боловсруулсан өд, ноолуур, тэдгээртэй хамт хийсэн зүйлс, хиймэл цэцэг">
                  Гутал, малгай, шүхэр, нарны халхавч, таяг, тулгуур, шилбүүр,
                  ташуур болон тэдгээрийн эд анги, боловсруулсан өд, ноолуур,
                  тэдгээртэй хамт хийсэн зүйлс, хиймэл цэцэг
                </option>
                <option
                  value="Чулуу , гөлтгөнө, цемент, шөрмөсөн чулуу, гялтгануур буюу
                  тэдгээртэй төстэй материалаар хийсэн зүйлс, керамик эдлэл, шил
                  ба шилэн эдлэл"
                >
                  Чулуу , гөлтгөнө, цемент, шөрмөсөн чулуу, гялтгануур буюу
                  тэдгээртэй төстэй материалаар хийсэн зүйлс, керамик эдлэл, шил
                  ба шилэн эдлэл
                </option>
                <option
                  value="Үнэт чулуу, үнэт металл, үнэт металлан бүрмэл үндсэн металл,
                  тэдгээрээр хийсэн зүйлс, гоёлын дуураймал зүйлс"
                >
                  Үнэт чулуу, үнэт металл, үнэт металлан бүрмэл үндсэн металл,
                  тэдгээрээр хийсэн зүйлс, гоёлын дуураймал зүйлс
                </option>
                <option
                  value=" Машин тоног төхөөрөмж ба механик төхөөрөмж, цахилгаан
                  хэрэгсэл, тэдгээрийн эд анги, тоног хэрэгсэл"
                >
                  Машин тоног төхөөрөмж ба механик төхөөрөмж, цахилгаан
                  хэрэгсэл, тэдгээрийн эд анги, тоног хэрэгсэл
                </option>
                <option
                  value="Оптик, гэрэл зураг, кино зураг,хэмжүүр ,хяналт, нарийвчлал,
                  эмнэлэг буюу мэс заслын багаж ба аппарат, ханын, ширээний,
                  бугуйн цаг, хөгжмийн зэвсэг, тэдгээрийн эд анги ба тоног
                  хэрэгсэл"
                >
                  Оптик, гэрэл зураг, кино зураг,хэмжүүр ,хяналт, нарийвчлал,
                  эмнэлэг буюу мэс заслын багаж ба аппарат, ханын, ширээний,
                  бугуйн цаг, хөгжмийн зэвсэг, тэдгээрийн эд анги ба тоног
                  хэрэгсэл
                </option>
                <option value=" Зэвсэг, галт хэрэгсэл, тэдгээрийн эд анги ба тоног хэрэгсэл">
                  Зэвсэг, галт хэрэгсэл, тэдгээрийн эд анги ба тоног хэрэгсэл
                </option>
                <option value="  Аж үйлдвэрийн төрөл бүрийн бараа">
                  Аж үйлдвэрийн төрөл бүрийн бараа
                </option>
                <option value="  Урлагийн бүтээл, цуглуулгийн зүйлс ба эртний үнэт ховор зүйлс">
                  Урлагийн бүтээл, цуглуулгийн зүйлс ба эртний үнэт ховор зүйлс
                </option>
              </select>
            </div>

            <div className="baggage__content-cell-input">
              <label>Aчааны баглаа боодлын төрөл</label>
              <select
                name="bundle_sort"
                value={data.bundle_sort}
                onChange={onChangeHandler}
              >
                <option value="">Сонгох...</option>
                <option value="Шуудай">Шуудай</option>
                <option value="Хайрцаг">Хайрцаг</option>
                <option value="Подон">Подон</option>
                <option value="Пресс">Пресс</option>
              </select>
            </div>

            <div className="baggage__content-cell-input">
              <label>Aчааны тоо ширхэг</label>
              <input
                name="total_piece"
                type="number"
                value={data.total_piece}
                onChange={onChangeHandler}
              />
            </div>

            <div className="baggage__content-cell-input">
              <label>
                Хавсаргалт материал
                <p about="alert">
                  (Та 5mb хэтрүүлэхгүй ачаа барааны зураг, гэрчилгээ, гарал
                  үүслийн зургийг оруулна уу!)
                </p>
              </label>
              <FileUploader
                file={data.pinned_file}
                getFile={setPinFile}
                center
              />
            </div>
          </div>

          <div className="baggage__content-cell">
            <div className="baggage__content-cell-input">
              <label>Ачааны тээвэрлэлтийн чиглэл</label>
              <div className="baggage__content-cell-input-body" about="where">
                Хаанаас:
                <select
                  name="come_from"
                  about="where"
                  value={data.come_from}
                  onChange={onChangeHandler}
                >
                  <option value="">Сонгох...</option>
                  <option value="Улаанбаатар">Улаанбаатар</option>
                  <option value="Эрээн">Эрээн</option>
                  <option value="Бээжин">Бээжин</option>
                  <option value="ОХУ">ОХУ</option>
                  <option value="АНУ">АНУ</option>
                </select>
                Хаашаа:
                <select
                  name="go_to"
                  about="where"
                  value={data.go_to}
                  onChange={onChangeHandler}
                >
                  <option value="">Сонгох...</option>
                  <option value="Улаанбаатар">Улаанбаатар</option>
                  <option value="Эрээн">Эрээн</option>
                  <option value="Бээжин">Бээжин</option>
                  <option value="ОХУ">ОХУ</option>
                  <option value="АНУ">АНУ</option>
                </select>
              </div>
            </div>

            <div className="baggage__content-cell-input">
              <label>
                Ачааны нийт хэмжээ
                <p about="alert">(Аль нэг хэмжээсээр заавал оруулах!)</p>
              </label>
              <div className="baggage__content-cell-input-body">
                <input
                  name="weight_metr"
                  type="number"
                  value={data.weight_metr}
                  onChange={onChangeHandler}
                />
                м³ (тн, кг)
              </div>
            </div>

            <div className="baggage__content-cell-input">
              <label>
                Одоо хадгалагдаж байгаа газар
                <p about="alert">
                  (Хувь хүн, байгуулгын хаяг байршил, утасны дугаарыг
                  дэлгэрэнгүй оруулна уу!)
                </p>
              </label>
              <textarea
                rows={4}
                name="loaded_place"
                value={data.loaded_place}
                onChange={onChangeHandler}
              />
            </div>

            <div className="baggage__content-cell-input">
              <label>
                Хориглосон ачаа барааны жагсаалт харах
                <BsFillExclamationCircleFill color="red" />
              </label>
              <a
                className="baggage__content-cell-input-list"
                href="!#"
                download="list.png"
              >
                Жишээ маягт татах
              </a>
            </div>

            <div className="baggage__content-cell-input">
              <label>
                Нэмэлт мэдээлэл
                <p about="alert">
                  (Ачааны анхаарах зүйлс, саналт хүсэлт г.м 300 тэмдэгтэд
                  багтаана уу!)
                </p>
              </label>
              <textarea
                rows={4}
                name="addition"
                value={data.addition}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>

        <div className="baggage__footing">
          <div className="baggage__footing-helper">
            <b className="baggage__footing-helper-title">Тусламжийн хэсэг</b>

            <b className="baggage__footing-helper-text">
              Утасны дугаар:
              <ul>
                <li>+(976) 7533-6060</li>
                <li>+(976) 93000022</li>
              </ul>
            </b>
          </div>

          <button className="baggage__footing-saveBtn" type="submit">
            {id ? "Хадгалах" : "Бүртгүүлэх"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BaggageModal;
