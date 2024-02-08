import React from "react";
import Card from './Card'

function PlayList({ playlist, selectedMusic, selectMusic }) {
  return (
    <div>
      {playlist.map((m) => {
        return (
          <div key={m.id}>

          <Card  data={m} selectedMusic={selectedMusic} selectMusic={selectMusic}/>
          </div>
        );
      })}

    </div>
  );
}

export default PlayList;
