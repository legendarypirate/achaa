// @ts-nocheck
import React, { useState } from "react";
import { AiOutlineCalculator } from "react-icons/ai";
import CubicmeterModal from "../../UserComp/CubicmeterModal/CubicmeterModal";


const Calculator = () => {
  const [showCubic, setShowCubic] = useState(false);

  return (
    <div className="calculator">
      <CubicmeterModal
        visible={showCubic}
        onCancel={() => setShowCubic(false)}
      />

      <AiOutlineCalculator size={56} color="white" />
      <h3 className="calculator__title">CBM CALCULATOR</h3>

      <label className="calculator__text">
        CBM Calculator нь ачааны жин, эзэлхүүнийг тооцоолох үнэгүй хэрэгсэл юм.
      </label>

      <button
        className="calculator__button"
        onClick={() => {
          setShowCubic(true);
        }}
      >
        Тооцоолох
      </button>
    </div>
  );
};

export default React.memo(Calculator);
