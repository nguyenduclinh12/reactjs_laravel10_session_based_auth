import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "../../../../lib/axios";
import { MyContext } from "../../../../App";
import { useNavigate } from "react-router-dom";
import { inStore } from "../../../../lib/functions";

const Login = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const handleChange = (e) => {
    setLoginInput((prevLoginInput) => ({
      ...prevLoginInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    context.setLoading(null);
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios
      .post("/api/v1/login", data)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setErrors([]);
          inStore("auth_token", res.data.token, true);
          inStore("username", res.data.username, true);
          navigate("/admin");
        } else {
          setErrors(res.data.errors);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      })
      .finally(() => {
        context.setLoading(100);
      });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="form-label col-md-12">
                Email
              </label>
              <div className="col-sm-12">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={loginInput.email}
                  onChange={handleChange}
                />
                {}
              </div>
              {errors?.email ? (
                <span className="text-danger">* {errors.email}</span>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputPassword" className="col-sm-12 form-label">
                Password
              </label>
              <div className="col-md-12">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  value={loginInput.password}
                  onChange={handleChange}
                />
              </div>
              {errors?.password ? (
                <span className="text-danger">* {errors.password}</span>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3 row">
              <div className="col-md-12">
                <Button type="submit" className="btn-primary">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
