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
import { Link } from "react-router-dom";

function Home() {
  const audioPlayerRef = useRef(null);
  const [playlist, setPlaylist] = useState([
    {
      name: "Udhungada Sangu ",
      music: two,
      id: 1,
      composer: "Anirudh Ravichander",
      img: UdhundadaSangu,
    },
    {
      name: "Pala Palakkura",
      music: Ayan,
      id: 2,
      composer: "Harris Jayaraj",
      img: palaPalakkura,
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
    id: 1,
    composer: "Anirudh Ravichander",
    img: UdhundadaSangu,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShuffle, setIsShuffle] = useState(true);
  const [stopCounter, setStopCounter] = useState(true);
  const [temp, setTemp] = useState(0);
  const [googleAuthData, setGoogleAuthData] = useState({});

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

  let loginData = window.localStorage.getItem("cred");
  let parsedLogin = JSON.parse(loginData);

  let data = window.localStorage.getItem("googleAuth");
  let parsedData = JSON.parse(data);

  const handleLogout = () => {
    console.log("logout");
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "385029428488-50ed9bvmeatkut4i9kpppi2o5ocq2apb.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
  }, []);

  const handleCallbackResponse = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);
  };

  return (
    <div className="container">
      <header>
        <div className="logData">
          <img
            src={
              parsedData
                ? parsedData.picture
                : "data:image/png;base64,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"
            }
            alt={parsedData.given_name}
          />
          <h4>{parsedData ? parsedData.name : parsedLogin.email}</h4>
        </div>
        <h1>Music Player</h1>

        {/* <Link to="/login"> */}
        <button onClick={handleLogout} id="lgOutBtn" className="logoutBtn">
          Logout
        </button>
        {/* </Link> */}
      </header>
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
