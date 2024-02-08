import { useState, useRef, useEffect } from "react";
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
import Shuffle from "../assets/logos/shuffle.png";
import PlayList from "../components/PlayList";
import Streaming from "../components/Streaming";
import Header from "../components/Header";

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

  const [counter, setCounter] = useState();
  const [randomSongId, setRandomSongId] = useState(1);
  const [selectedMusic, setSelectedMusic] = useState({
    name: "Pala Palakkura",
    music: Ayan,
    id: 1,
    composer: "Harris Jayaraj",
    img: palaPalakkura,
  });
  const [isPlaying, setIsPlaying] = useState(true);
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
    setIsPlaying(true);

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
      <Header title={'Music Player'}/>
      <section className="musicContainer">
        {counter}
        <div id="playStream">
          <Streaming
            selectedMusic={selectedMusic}
            isPlaying={isPlaying}
            playAndPause={playAndPause}
            audioPlayerRef={audioPlayerRef}
            previousSong={previousSong}
            nextSong={nextSong}
          />
          <PlayList
            playlist={playlist}
            selectedMusic={selectedMusic}
            selectMusic={runLoops}
          />
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Home;
