import React from "react";
import googleLogo from '../assets/google.jpg';

function Google() {
  return (
    <div className="google">
      <p>
        <img
          src={googleLogo}
          alt="gg"
          height={30}
          style={{ marginRight: "20px" }}
        />
        Continue with google
      </p>
    </div>
  );
}

export default Google;
