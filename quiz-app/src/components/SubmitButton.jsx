import React from "react";

function SubmitButton({ showResult }) {
  return (
    <button
      id="submitBtn"
      className="w-[150px] mb-2 p-2 flex justify-center self-center bg-black text-white outline-none rounded-lg cursor-pointer mt-10 md:mt-2"
      onClick={showResult}
    >
      submit
    </button>
  );
}

export default SubmitButton;
