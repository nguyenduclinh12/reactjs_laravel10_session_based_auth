import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/v1/check-auth")
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return authenticated ? children : <Navigate to="/login" />;
}
