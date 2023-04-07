import { Player } from "@lottiefiles/react-lottie-player";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, googleLogin, register } from "../Store/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import validator from "validator";

const Login = () => {
  const [state, setstate] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };
    if (loginDetails) {
      await dispatch(login({ loginDetails, navigate }));
    }
  };

  const registerData = async (e) => {
    e.preventDefault();
    const initialValues = {
      username,
      password,
      email,
    };
    if (validator.isEmail(email) == false) {
      return toast.error("Invalid email");
    } else if (password != confirmPassword) {
      return toast.error("Password does not match");
    } else if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    } else if (username.length < 5) {
      return toast.error("Username must be at least 5 characters");
    } else if (username && password && confirmPassword && email) {
      await dispatch(register({ initialValues, navigate }));
    } else {
      toast.error("All feildes are required");
    }
  };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "795770346023-kscfpb99ke89qc40ul1pvenvhek698mj.apps.googleusercontent.com",
      });
    });
  }, []);

  const googleSuccess = async (resp) => {
    const result = {
      username: resp.profileObj.name,
      email: resp.profileObj.email,
      token: resp.tokenId,
      googleId: resp.googleId,
    };
    await dispatch(googleLogin({ result, navigate }));
  };
  const googleFailure = (error) => {
    toast.error("Server error ,Try again");
  };

  const registerBtn = () => {
    setstate(false);
  };

  const loginButton = () => {
    setstate(true);
  };

  return (
    <div>
      <div className=" flex justify-around   min-h-screen   items-center ">
        <div className=" min-w-96  sm:bg-blue-100 sm:p-12  rounded-3xl  xl:p-20 flex items-center md:items-start justify-center md:justify-start">
          <div className="relative ">
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_umwjpnnn.json"
              style={{ height: "400px", width: "300px", marginTop: "10px" }}
            ></Player>
          </div>
          <div
            className={
              state
                ? "absolute overflow-hidden my-3  bg-[rgba(0,0,0,0.5)]  flex rounded-2xl duration-1000  flex-col gap-4  flex-wrap p-5  "
                : "absolute  overflow-hidden   bg-[rgba(0,0,0,0.5)] -mx-3 flex rounded-2xl duration-1000  flex-col gap-4  flex-wrap p-5 -my-8 "
            }
          >
            <div className="border-2 flex h-11 relative w-72  border-white rounded-2xl">
              <button
                className={
                  state
                    ? " text-xl h-full w-36  duration-1000  rounded-2xl  text-center"
                    : "bg-sky-500 text-xl h-full w-36  duration-1000  rounded-2xl  text-center"
                }
                onClick={loginButton}
              >
                Login
              </button>
              <button
                className={
                  state
                    ? "bg-sky-500 text-xl   duration-1000 ease-out  h-full w-36  rounded-2xl text-center"
                    : "text-xl  duration-1000 ease-out h-full w-36  rounded-2xl text-center"
                }
                onClick={registerBtn}
              >
                Register
              </button>
            </div>
            <form
              className={
                state
                  ? " flex  flex-col duration-1000 gap-4"
                  : "-ml-[400px] duration-1000"
              }
            >
              <div className="relative cursor-pointer">
                <input
                  className="h-11 w-72 px-6 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                  type="text"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <span className="text-xl -my-3    pointer-events-none  text-white absolute left-5 top-5 px-1 transition duration-200 input-text">
                  Email
                </span>
              </div>
              <div className="relative">
                <input
                  className="h-11 w-72 px-6 text-white bg-[rgba(0,0,0,0.5)] text-xl  border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 "
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <span className="text-xl  pointer-events-none -my-3 text-white  absolute left-5 top-5 px-1 transition duration-200 input-password ">
                  Password
                </span>
              </div>
              <button
                onClick={submit}
                className="text-xl text-white rounded-3xl h-11 w-72 hover:bg-[rgba(0,0,0,0.5)]  border-2 border-white"
              >
                Login
              </button>
            </form>
            <form
              className={
                state
                  ? "absolute ml-[400px]  mt-14 flex flex-col gap-4 "
                  : " absolute pt-1 mt-14 flex flex-col delay-100 duration-1000 gap-4"
              }
            >
              <div className="relative cursor-pointer">
                <input
                  className="h-11 w-72 px-6 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></input>
                <span className="text-xl -my-3    pointer-events-none  text-white absolute left-5 top-5 px-1 transition duration-200 input-text">
                  Username
                </span>
              </div>
              <div className="relative">
                <input
                  className="h-11 w-72 px-6 text-white bg-[rgba(0,0,0,0.5)] text-xl  border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 "
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <span className="text-xl  pointer-events-none -my-3 text-white  absolute left-5 top-5 px-1 transition duration-200 input-email ">
                  Email
                </span>
              </div>
              <div className="relative">
                <input
                  className="h-11 w-72 px-6 text-white bg-[rgba(0,0,0,0.5)] text-xl  border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 "
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <span className="text-xl  pointer-events-none -my-3 text-white  absolute left-5 top-5 px-1 transition duration-200 input-password ">
                  Password
                </span>
              </div>
              <div className="relative">
                <input
                  className="h-11 w-72 px-6 text-white bg-[rgba(0,0,0,0.5)] text-xl  border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 "
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></input>
                <span className="text-xl  pointer-events-none -my-3 text-white  absolute left-5 top-5 px-1 transition duration-200 input-password ">
                  Confirm Password
                </span>
              </div>
              <button
                onClick={registerData}
                className="text-xl text-white rounded-3xl h-11 w-72 hover:bg-[rgba(0,0,0,0.5)]  border-2 border-white"
              >
                Register
              </button>
            </form>
            <div
              className={
                state
                  ? " grid grid-cols-3 items-center text-white"
                  : "grid grid-cols-3 items-center text-white mt-36"
              }
            >
              <hr className="border-white" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-white" />
            </div>
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="px-16 w-72 text-white bg-sky-600 hover:bg-sky-500   font-medium rounded-lg text-sm  py-2.5 text-center inline-flex items-center  mr-2 mb-2"
                >
                  <svg
                    class="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Continue with Google
                </button>
              )}
              clientId="795770346023-kscfpb99ke89qc40ul1pvenvhek698mj.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            ></GoogleLogin>
          </div>
          <div className="invisible md:visible">
            <img className=" md:w-96 md:ml-14" src="login.svg"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
