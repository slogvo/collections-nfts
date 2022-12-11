import React from "react";
import ReactDOM from "react-dom";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import transfer from "../../assets/transfer.png";

//createPortal

const Deposit = ({ open = false, handleClose = () => {} }) => {
  const [exchange, setExchange] = useState("");
  if (typeof document === "undefined") return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div
      className={`modal fixed inset-0 transition-all flex items-center justify-center p-5 z-50 ${
        open ? "" : "opacity-0 invisible"
      }`}
    >
      <div
        className="overlay absolute inset-0 bg-gray-500 bg-opacity-80"
        onClick={handleClose}
      ></div>
      <div className="relative w-full max-w-[482px] bg-white z-10 p-10 rounded-lg shadow-2xl text-[#141418]">
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#c084fc"
            className="bi bi-x-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </span>
        <div className="flex flex-col">
          <span className="mt-4 font-bold text-[18px] tracking-normal">
            You are sending
          </span>
          <div className="mt-4 flex gap-x-3 items-center">
            <CurrencyInput
              id="input-example"
              name="input-name"
              placeholder="Please enter a number"
              decimalsLimit={2}
              onValueChange={(value, name) => setExchange(value)}
              className="border border-solid w-[300px] border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            />
            <span className="font-[500]">USD</span>
          </div>
          <div className="mt-4 flex gap-x-3 items-center">
            <img src={transfer} alt="" className="w-4 h-4 object-cover" />
            {!exchange ? null : (
              <span className="text-[20px] text-[#c084fc]">
                {(exchange * 0.00079).toFixed(5)}
              </span>
            )}
            <span className="font-[500]">ETH</span>
          </div>
          <button className="mt-8 inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-[#c084fc] rounded-lg h-[53px] active:bg-[#cc9dfb]">
            Add
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Deposit;
