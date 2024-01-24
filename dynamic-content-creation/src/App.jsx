import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const imgGallery = [
    "https://picsum.photos/id/11/367/267",
    "https://picsum.photos/id/13/367/267",
    "https://picsum.photos/id/19/367/267",
    "https://picsum.photos/id/20/367/267",
    "https://picsum.photos/id/22/367/267",
    "https://picsum.photos/id/23/367/267",
    "https://picsum.photos/id/26/367/267",
    "https://picsum.photos/id/27/367/267",
    "https://picsum.photos/id/18/367/267",
    "https://picsum.photos/id/7/367/267",
  ];

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-center gap-3 align-items-center ">
        <button
          className="w-25 p-3 rounded"
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
        <h1>Count : {count}</h1>
        <button
          className="w-25 p-3 rounded"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      {/* <div className="d-flex justify-content-center  align-items-center m-5">
        <img className="rounded" src={`https://picsum.photos/200/300?random=${count}`} />
      </div> */}

      {count > 10 || count < 0 ? (
        <p className="d-flex justify-content-center  align-items-center m-5 text-danger">
          Count should be between 0 and 10
        </p>
      ) : (
        <div className="d-flex justify-content-center  align-items-center gap-5 flex-wrap m-5">
          {imgGallery.map((img, i) => {
            if (i < count) {
              return <img className="rounded" key={i} src={img} alt={img} />;
            }
          })}
        </div>
      )}
    </div>
  );
}

export default App;
