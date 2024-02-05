import { useState, useRef, useEffect } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ayan from "../assets/music/1_3.0.mp3";
import two from "../assets/music/2_3.1.mp3";
import three from "../assets/music/3.mp3";
import four from "../assets/music/4.mp3";
import five from "../assets/music/5.mp3";

import Play from "/play.png";
import {
  enthero,
  Kokkarakokkarako,
  naaReady,
  palaPalakkura,
  UdhundadaSangu,
} from "../assets/logos/logos";
import Shuffle from "../assets/logos/shuffle.png";

function Home() {
  const audioPlayerRef = useRef(null);
  const [playlist, setPlaylist] = useState([
    {
      name: "Pala Palakkura",
      music: Ayan,
      id: 1,
      composer: "Harris Jayaraj",
      img: palaPalakkura,
    },
    {
      name: "Udhungada Sangu ",
      music: two,
      id: 2,
      composer: "Anirudh Ravichander",
      img: UdhundadaSangu,
    },
    { name: "Enthero", music: three, id: 3, composer: "appu", img: enthero },
    {
      name: "Kokkara Kokkarako",
      music: four,
      id: 4,
      composer: "Vidyasagar",
      img: Kokkarakokkarako,
    },
    {
      name: "Naa Ready",
      music: five,
      id: 5,
      composer: "Anirudh Ravichander",
      img: naaReady,
    },
  ]);

  useEffect(() => {}, []);

  const [counter, setCounter] = useState();
  const [randomSongId, setRandomSongId] = useState(1);
  const [selectedMusic, setSelectedMusic] = useState({
    name: "Pala Palakkura",
    music: Ayan,
    id: 1,
    composer: "Harris Jayaraj",
    img: palaPalakkura,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(true);
  const [stopCounter, setStopCounter] = useState(true);
  const [temp, setTemp] = useState(0);

  const showToastMessage = (message = "Playing next track!") => {
    toast(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      closeButton: false,
    });
  };

  const increNum = async (i) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        if (i == 5) {
          showToastMessage();
          if (isShuffle) {
            let num = Math.random() * (6 - 1) + 1;
            let num1 = Math.floor(num);
            console.log("isShuffle", num1);
            randomeSong(num1);
          } else {
            if (selectedMusic.id == 5) {
              randomeSong(1);
            } else {
              randomeSong(selectedMusic.id + 1);
            }
          }
        }
        resolve(setCounter(i));
      }, 1000)
    );
  };
  const theLoop = async () => {
    for (let i = 1; i <= 5; i++) {
      await increNum(i);
    }
  };
  const runLoops = async (id) => {
    selectMusic(id);
    setIsPlaying((prev) => !prev);

    for (let i = 0; i < 25; i++) {
      if (setTemp != 0) {
        setStopCounter(false);
      }
      let i;
      for (i = 0; i < 3; i++) {
        setTemp(temp + 1);
        if (stopCounter) {
          await theLoop();
        } else {
          setCounter(0);
          setStopCounter(false);
          return;
        }
      }
    }
  };

  const randomeSong = (id) => {
    selectMusic(id);
  };

  const selectMusic = (selectedId) => {
    let clicked = playlist.find((p) => p.id == selectedId);
    setSelectedMusic(clicked);
  };

  const previousSong = (id) => {
    runLoops();
    showToastMessage("Playing previous track!");
    if (id == 1) {
      randomeSong(5);
    } else {
      randomeSong(id - 1);
    }
  };

  const nextSong = (id) => {
    runLoops();
    showToastMessage();
    console.log(id);
    if (id == 5) {
      randomeSong(1);
    } else {
      randomeSong(id + 1);
    }
  };

  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
    console.log(isShuffle);
  };

  const playAndPause = () => {
    setIsPlaying((prev) => !prev);
    const audioPlayer = audioPlayerRef.current;

    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Music Player</h1>
      </header>
      <section className="musicContainer">
        {counter}
        <div id="playStream">
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
                {/* {isShuffle ? (
                  <img id="shuffle" src={Shuffle} onClick={handleShuffle} />
                ) : (
                  <img
                    id="shuffle"
                    style={{ opacity: 0.2 }}
                    src={Shuffle}
                    onClick={handleShuffle}
                  />
                )} */}
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
          {playlist.map((m) => {
            return (
              <div
                style={
                  m.id === selectedMusic.id
                    ? { opacity: "0.3" }
                    : { opacity: "1" }
                }
                className="music"
                key={m.id}
                onClick={() => runLoops(m.id)}
              >
                <img src={m.img} alt="i" id="musicLogo" />
                <div>
                  <p id="musicName">{m.name}</p>
                  <p id="composer">{m.composer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Home;
