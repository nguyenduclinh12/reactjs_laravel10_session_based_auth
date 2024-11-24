import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { createContext, useEffect, useState } from "react";
import { fromStore } from "./lib/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContext = createContext();
function App() {
  const [loading, setLoading] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = fromStore("_token");
    if (token) {
      setIsLogin(true);
    }
  }, []);
  const values = {
    loading,
    setLoading,
    isLogin,
    ToastContainer,
    toast
  };
  return (
    <Router>
      <MyContext.Provider value={values}>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path ? route.path : ""}
                element={route.element}
              >
                {route.children &&
                  route.children.map((child, index) => {
                    return (
                      <Route
                        key={index}
                        index={child.index ? index : ""}
                        path={child.path ? child.path : ""}
                        element={child.element}
                      >
                        {child.children &&
                          child.children.map((child, index) => {
                            return (
                              <Route
                                key={index}
                                index={child.index ? index : ""}
                                path={child.path ? child.path : ""}
                                element={child.element}
                              ></Route>
                            );
                          })}
                      </Route>
                    );
                  })}
              </Route>
            );
          })}
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
export { MyContext };
