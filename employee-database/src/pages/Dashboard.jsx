import { useState, useEffect } from "react";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.error(userData);
  }, [page]);


  const firstPage = () => {
    setPage(1);
  };

  const secondPage = () => {
    setPage(2);
  };

  return (
    <div className="container d-flex justify-content-center mt4">
      <h1>Employee Dashboard</h1>

      {userData.map((u)=>{
        <p>{u.id}</p>
      })}


      <button
        onClick={firstPage}
        style={{
          pointerEvents: page === 1 ? "none" : "auto",
          opacity: page === 1 ? 0.5 : 1,
        }}
      >
        1
      </button>

      <button
        onClick={secondPage}
        style={{
          pointerEvents: page === 2 ? "none" : "auto",
          opacity: page === 2 ? 0.5 : 1,
        }}
      >
        2
      </button>
    </div>
  );
}

export default Dashboard;
