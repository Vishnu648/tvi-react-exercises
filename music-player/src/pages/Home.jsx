import { useState, useEffect } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ayan from "../assets/music/1_3.0.mp3";
import two from "../assets/music/2_3.1.mp3";
import three from "../assets/music/3.mp3";
import four from "../assets/music/4.mp3";
import five from "../assets/music/5.mp3";

import {
  enthero,
  Kokkarakokkarako,
  naaReady,
  palaPalakkura,
  UdhundadaSangu,
} from "../assets/logos/logos";

function Home() {
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

  const [counter, setCounter] = useState();
  const [randomSongId, setRandomSongId] = useState(1);
  const [selectedMusic, setSelectedMusic] = useState({
    name: "Udhungada Sangu ",
    music: two,
    id: 2,
    composer: "Anirudh Ravichander",
    img: UdhundadaSangu,
  });

  const showToastMessage = () => {
    toast("Playing next track!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      closeButton: false,
    });
  };

  const randomNumberGenerator = () => {
    let num = Math.random() * (6 - 1) + 1;
    let num1 = Math.floor(num);
    setRandomSongId(num1);
    return randomSongId;
  };

  const increNum = async (i) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        if (i == 10) {
          showToastMessage();
            let loggg=randomNumberGenerator();
            console.log(loggg)
        
        }
        resolve(setCounter(i));
      }, 1000)
    );
  };
  const theLoop = async () => {
    for (let i = 1; i <= 10; i++) {
      await increNum(i);
    }
  };
  const runLoops = async (id) => {
    selectMusic(id);
    for (let i = 0; i < 25; i++) {
      await theLoop();
    }
  };

  const selectMusic = (selectedId) => {
    let clicked = playlist.find((p) => p.id == selectedId);
    setSelectedMusic(clicked);
    console.log(clicked);
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
              <img
                onClick={() => console.log(selectMusic)}
                id="streamingImg"
                src={selectedMusic.img}
              />
              <div id="streamingDetails">
                <p className="streamName">{selectedMusic.name}</p>
                <p></p>
                <p className="streamComposer">{selectedMusic.composer}</p>
              </div>
            </div>
            <div id="audioTag">
              <div id="nextPrevSong">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-previous.svg"
                  alt="prev"
                />
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-pause.svg"
                  alt="pause/play"
                />
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-next.svg"
                  alt="pause/play"
                />
              </div>
              <audio id="audio" controls src={selectedMusic.music} autoPlay />
            </div>
          </div>
          {playlist.map((m) => {
            return (
              <div className="music" key={m.id} onClick={() => runLoops(m.id)}>
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
