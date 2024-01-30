import { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ayan from "../assets/music/1_3.0.mp3";
import two from "../assets/music/2_3.1.mp3";
import three from "../assets/music/3.mp3";
import four from "../assets/music/4.mp3";
import five from "../assets/music/5.mp3";

function Home() {
  const [playlist, setPlaylist] = useState([
    { name: "Pala Palakkura", music: Ayan, id: 1, composer: "Harris Jayaraj" },
    {
      name: "Udhungada Sangu ",
      music: two,
      id: 2,
      composer: "Anirudh Ravichander",
    },
    { name: "Enthero", music: three, id: 3, composer: "appu" },
    { name: "Kokkara Kokkarako", music: four, id: 4, composer: "Vidyasagar" },
    { name: "Naa Ready", music: five, id: 5, composer: "Anirudh Ravichander" },
  ]);

  const [counter, setCounter] = useState(0);
  const [stopCounter, setStopCounter] = useState(true);

  const showToastMessage = () => {
    toast("Playing next track!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      closeButton: false,
    });
  };

  const counterLoop = async () => {
    for (let i = 1; i <= 3; i++) {
      let count = await setTimeout(() => {
        setCounter(i);
      }, i * 1000);
    }
    showToastMessage();
    setCounter(0);
  };

  const handleCounter = () => {
    for (let i = 0; i < 3; i++) {
      counterLoop();
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Music Player</h1>
      </header>
      <section className="musicContainer">
        <div className="streaming"></div>
        {counter}
        {playlist.map((m) => {
          return (
            <div className="music" key={m.id} onClick={handleCounter}>
              <p>{m.name}</p>
              <audio controls>
                <source src={m.music} />
              </audio>
            </div>
          );
        })}
      </section>
      <ToastContainer />
    </div>
  );
}

export default Home;
