import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${page}`
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setUserData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [page]);

  const firstPage = () => {
    setPage(1);
  };

  const secondPage = () => {
    setPage(2);
  };

  return (
    <div className="DashboardContainer">
      <header>
        <h1 style={{ margin: "15px" }}>Employee Dashboard</h1>
        <Link to={'/newEmployee'} >
          <button className="addBtn">Add</button>
        </Link>
      </header>
      {isLoading ? (
        <div class="spinner-border mt-3" role="status"></div>
      ) : (
        <div className="CardsMap">
          {userData.map((u) => (
            <Card key={u.id} data={u} />
          ))}
        </div>
      )}
      <div id="buttons">
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
    </div>
  );
}

export default Dashboard;
