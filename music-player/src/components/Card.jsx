import React from "react";

function Card({data,selectedMusic,selectMusic}) {
  return (
    <div
      style={data.id === selectedMusic.id ? { opacity: "0.3" } : { opacity: "1" }}
      className="music"
      
      onClick={() => selectMusic(data.id)}
    >
      <img src={data.img} alt="i" id="musicLogo" />
      <div>
        <p id="musicName">{data.name}</p>
        <p id="composer">{data.composer}</p>
      </div>
    </div>
  );
}

export default Card;
