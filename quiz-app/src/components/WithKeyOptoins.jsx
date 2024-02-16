import React from "react";

function WithKeyOptoins({q,handleClick,c}) {
  return q.answers[c] ? (
    <label
      key={c}
      htmlFor={q.answers[c]}
      id="answersLabel"
      className="flex accent-black gap-2 mt-2 mb-2 ml-9"
      onClick={(e) => handleClick(q, e.target.value)}
    >
      <input
        type="radio"
        value={q.answers[c]}
        id={q.answers[c]}
        name={q.question}
      />
      {q.answers[c]}
    </label>
  ) : (
    ""
  );
}

export default WithKeyOptoins;
