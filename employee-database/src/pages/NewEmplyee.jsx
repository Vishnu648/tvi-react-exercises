import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

function NewEmplyee() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [resData, setResData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const data = {
    name: name,
    job: job,
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await axios.post("https://reqres.in/api/users", data);
        setResData(response.data);
        if (response.status == 201) {
          setIsSuccess(true);
        }
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (name.length > 0 && job.length > 0) {
      postData();
    }
    setName("");
    setJob("");
    setEmail("");
  };

  return (
    <div className="EmployeeContainer">
      <header>
        <Link to={"/"}>
          <button className="addBtn">Back</button>
        </Link>
        <h2>Add new Employee</h2>
      </header>
      <form>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="name"
        />
        <input
          type="text"
          onChange={(e) => setJob(e.target.value)}
          value={job}
          placeholder="job"
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button
          type="buttn"
          className="addBtn"
          onClick={handleAdd}
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          Add
        </button>
        {isSuccess ? <Alert message={"Employee Added Successfully"} /> : null}
      </form>
    </div>
  );
}

export default NewEmplyee;
