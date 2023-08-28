import React, { useEffect, useState } from "react";
import picture from "./facebookIcon.svg";
import { useMediaQuery } from "../../utils/useMediaQuery";
import CreateAccount from "../../component/modals/CreateAccount";
import Loading from "../../component/Loading";
import axios, { AxiosError } from "axios";
import { setLogIn } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const isTablet = useMediaQuery("(min-width: 767px)");
  const prefixURL = process.env.REACT_APP_PREFIX_URL;
  const [processing, setProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  const handleAlertClick = () => {
    setShowAlert(false);
  };

  const saveToken = (value: string) => {
    sessionStorage.setItem("userToken", value);
    navigate("/home");
  };

  const logInHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.post(`${prefixURL}/auth/login`, user);
      const data = await response.data;

      dispatch(setLogIn(data.user));
      saveToken(data.token);
    } catch (error) {
      console.error(error);
      if(axios.isAxiosError(error)){
        const axiosError = error as AxiosError;
        if(axiosError.response?.status){
          setIsLoginFailed(true)
        }
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <CreateAccount
        setShowAlert={setShowAlert}
        setIsProcessing={setProcessing}
        setIsSuccess={setIsSuccess}
      />
      <Loading isShow={processing} />
      <div
        className={`d-flex justify-content-evenly align-items-center ${
          isTablet ? "" : "flex-column gap-4"
        }`}
        style={{ height: isTablet ? "70vh" : "unset" }}
      >
        <div className={`${isTablet ? "w-50 " : "mt-5 text-center"} `}>
          <img src={picture} alt="facebook logo" style={{ width: "270px" }} />
          <h2 className="">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="text-center">
          <div
            className="border rounded p-3 shadow mb-4"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={(e) => logInHandle(e)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control lh-lg"
                  placeholder="Email address"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control lh-lg"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                {isLoginFailed && <div className="mt-1 text-danger">Invalid E-mail or Password</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100 lh-lg">
                Log in
              </button>
            </form>
            <p className="mt-2">Forgotten password?</p>
            <div className="border-bottom"></div>
            <div
              className="btn btn-success mt-3 lh-lg"
              data-bs-toggle="modal"
              data-bs-target="#createAccountModal"
            >
              Create new account
            </div>
          </div>
          <b>Create a Page</b> for a celebrity, brand or business.
        </div>
      </div>
      {showAlert &&
        (isSuccess ? (
          <div
            className="alert alert-success alert-dismissible fade show m-5 position-fixed end-0 bottom-0"
            role="alert"
            style={{ zIndex: "9999" }}
          >
            Sign Up Success!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={handleAlertClick}
            ></button>
          </div>
        ) : (
          <div
            className="alert alert-danger alert-dismissible fade show m-5 position-fixed end-0 bottom-0"
            role="alert"
            style={{ zIndex: "9999" }}
          >
            Sign Up Failed!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={handleAlertClick}
            ></button>
          </div>
        ))}
    </div>
  );
}

export default IndexPage;
