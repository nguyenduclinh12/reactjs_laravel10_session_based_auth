import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "../../../../lib/axios";
import { MyContext } from "../../../../App";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const Register = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    error_list: [],
  });
  const handleChange = (e) => {
    setRegisterInput((prevRegisterInput) => ({
      ...prevRegisterInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    context.setLoading(null);
    const data = {
      username: registerInput.username,
      email: registerInput.email,
      password: registerInput.password,
      password_confirmation: registerInput.password_confirmation,
    };
    // await axios.get("sanctum/csrf-cookie");
    axios
      .post("/api/v1/register", data)
      .then((res) => {
        if (res.status === 200) {
          setErrors([]);
          navigate("/login");
        } else {
          setErrors(res.data.errors);
        }
      })
      .catch((err) => {
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
                Username
              </label>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  value={registerInput.username}
                  onChange={handleChange}
                />
              </div>
              {errors?.username ? (
                <span className="text-danger">* {errors.username}</span>
              ) : (
                ""
              )}
            </div>
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
                  value={registerInput.email}
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
                  value={registerInput.password}
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
              <label htmlFor="inputPassword" className="form-label col-md-12">
                re-password
              </label>
              <div className="col-md-12">
                <input
                  type="password"
                  className="form-control"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={registerInput.re_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <PasswordChecklist
              rules={["capital", "match", "specialChar", "minLength", "number"]}
              minLength={8}
              value={registerInput.password}
              valueAgain={registerInput.password_confirmation}
              messages={{
                minLength: "The minimum length of the password should be 10.",
                specialChar:
                  "The password should contain at least one special character.",
                number:
                  "The password should contain at least one numeric letter.",
                capital:
                  "The password should contain at least one uppercase letter.",
                match: "Password and password again should match.",
                lowercase:
                  "The password should contain at least one lowercase letter.",
              }}
            />
            <div className="mb-3 row">
              <div className="col-md-12">
                <Button type="submit" className="btn-primary">
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
