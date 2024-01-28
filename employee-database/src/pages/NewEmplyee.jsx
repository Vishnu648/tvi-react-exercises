import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class NewEmplyee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      job: "",
      email: "",
      isSuccess: false,
    };
  }

  handleNameChange=(e) => {
    this.setState({ name: e.target.value });
  }

  handleJobChange=(e) => {
    this.setState({ job: e.target.value });
  }

  handleEmailChange=(e) => {
    this.setState({ email: e.target.value });
  }
  

  handleAdd = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      job: this.state.job,
    };
    
    const postData = async () => {
      try {
        const response = await axios.post("https://reqres.in/api/users", data);
        if (response.status == 201) {
          this.setState({ isSuccess: true });
        }
        setTimeout(() => {
          this.setState({ isSuccess: false });
        }, 3000);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (name.length > 0 && job.length > 0) {
      postData();
    }
   this.setState({name:''})
   this.setState({job:''})
   this.setState({email:''})
  };

  render() {
    return (
      <div className="EmployeeContainer">
        <header>
          <Link to={"/"}>
            <button className="addBtn">Back</button>
          </Link>
          <h2>Add new Employee</h2>
          <h2></h2>
        </header>
        <form>
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.name}
            placeholder="name"
          />
          <input
            type="text"
            onChange={this.handleJobChange}
            value={this.state.job}
            placeholder="job"
          />
          <input
            type="email"
            placeholder="email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          <button
            type="buttn"
            className="addBtn"
            onClick={this.handleAdd}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Add
          </button>
          {this.isSuccess ? <Alert message={"Employee Added Successfully"} /> : null}
        </form>
      </div>
    );
  }
}
