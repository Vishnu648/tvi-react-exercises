import React from "react";

function Error({ err }) {
  return (
    <>
      {err ? (
        <p className="text-red-600 text-[20px] mt-2">complete the quiz</p>
      ) : (
        ""
      )}
    </>
  );
}

export default Error;
