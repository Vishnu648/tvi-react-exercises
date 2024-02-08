import React from 'react'
import Play from "/play.png";

function Streaming({selectedMusic,isPlaying,playAndPause,audioPlayerRef,previousSong,nextSong}) {
  return (
    <div className="streaming">
    <div id="upperStream">
      <img id="streamingImg" src={selectedMusic.img} />
      <div id="streamingDetails">
        <p className="streamName">{selectedMusic.name}</p>
        <p></p>
        <p className="streamComposer">{selectedMusic.composer}</p>
      </div>
    </div>
    <div id="audioTag">
      <div id="nextPrevSong">
        <img
          onClick={() => previousSong(selectedMusic.id)}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-previous.svg"
          alt="prev"
        />
        {isPlaying ? (
          <img
            onClick={playAndPause}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-pause.svg"
            alt="pause"
          />
        ) : (
          <img onClick={playAndPause} src={Play} alt="play" />
        )}

        <img
          onClick={() => nextSong(selectedMusic.id)}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-next.svg"
          alt="next"
        />
     
      </div>
      <audio
        ref={audioPlayerRef}
        id="audio"
        controls
        src={selectedMusic.music}
        autoPlay
      />
    </div>
  </div>
  )
}

export default Streaming
