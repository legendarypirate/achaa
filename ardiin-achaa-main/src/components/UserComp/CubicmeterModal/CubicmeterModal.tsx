// @ts-nocheck
import React, { useEffect, useState } from "react";
import Modal from "../../../tools/Modal/Modal";
import Input from "../../../tools/Input/Input";


const CubicmeterModal = ({ visible, onCancel }) => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const lengthFloat = parseFloat(length);
    const widthFloat = parseFloat(width);
    const thicknessFloat = parseFloat(thickness);

    setResult(lengthFloat * widthFloat * thicknessFloat);
  }, [length, width, thickness, visible]);

  const modalHandeleCancel = () => {
    setLength(0);
    setWidth(0);
    setThickness(0);
    onCancel();
  };

  return (
    <Modal visible={visible} onCancel={modalHandeleCancel}>
      <div className="cubicmeterModal">
        <h1 className="cubicmeterModal__title">Тооцоолол</h1>

        <div className="cubicmeterModal__input">
          <b className="cubicmeterModal__input-label">Урт (м)</b>
          <Input type="number" onChange={(e) => setLength(e.target.value)} />
        </div>

        <div className="cubicmeterModal__input">
          <b className="cubicmeterModal__input-label">Өргөн (м)</b>
          <Input type="number" onChange={(e) => setWidth(e.target.value)} />
        </div>

        <div className="cubicmeterModal__input">
          <b className="cubicmeterModal__input-label">Өндөр (м)</b>
          <Input type="number" onChange={(e) => setThickness(e.target.value)} />
        </div>

        <div className="cubicmeterModal__result">
          <b>Үр дүн =</b> {result}м³
        </div>
      </div>
    </Modal>
  );
};

export default CubicmeterModal;
