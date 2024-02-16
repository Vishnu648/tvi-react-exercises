import React from "react";

function Question({ i, question }) {
  return (
    <h2 className="text-xl font-semibold">
      {i} - {question}
    </h2>
  );
}

export default Question;
