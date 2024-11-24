import React, { useEffect } from "react";
import axios from "../../../lib/axios";

const Dashboard = () => {
  useEffect(() => {
    axios
      .get("/api/v1/categories")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
