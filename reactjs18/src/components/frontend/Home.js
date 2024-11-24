import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "../../lib/axios";

const Home = () => {
  useEffect(() => {
    axios
      .get("/api/v1/users")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Button className="btn-danger">Click</Button>
    </>
  );
};

export default Home;
