import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Store/features/auth-slice";
import { getEvents } from "../Store/features/event-slice";
import { Player } from "@lottiefiles/react-lottie-player";

const Header = () => {
  const [open, setOpen] = useState(false);
  let location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(getEvents());
  };

  let id = JSON.parse(localStorage.getItem("user"))?.details;
  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;
  return (
    <div>
      {location.pathname === "/login" ? null : (
        <div className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]   bg-sky-600 px-8 md:px-16 text-white w-full h-16 border-black flex items-center justify-between">
          <div>
            {admin === true ? (
              <Link to="/admin">
                <h1 className="flex underline underline-offset-4 -mt-3 text-3xl">
                  {" "}
                  Sp{" "}
                  <img
                    className="w-6 h-6 mt-3  rounded-full"
                    src="icon-ball.gif"
                  ></img>
                  rts Buddy
                </h1>
              </Link>
            ) : (
              <Link to="/">
                <h1 className="flex underline underline-offset-4 -mt-3 text-3xl">
                  {" "}
                  Sp{" "}
                  <img
                    className="w-6 h-6 mt-3  rounded-full"
                    src="icon-ball.gif"
                  ></img>
                  rts Buddy
                </h1>
              </Link>
            )}
          </div>
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? (
              <img className="h-8" src="menu-icon.png"></img>
            ) : (
              <img className="h-8" src="close-icon.png"></img>
            )}
          </div>
          <div
            className={` justify-between flex flex-col items-center md:flex-row -mt-4d  z-[1]  md:static absolute bg-sky-600 md:w-auto md:py-0 py-6   transition-all ease-in duration-500 w-full left-0 ${
              open ? "top-[-400px]" : "top-[60px]"
            }`}
          >
            {admin === true ? (
              <Link
                onClick={() => setOpen(!open)}
                to="/admin"
                className="hover:bg-sky-500  mx-5  min-w-fit text-center border-y-2 md:border-2 border-blue-400  px-5 py-2 md:rounded-3xl"
              >
                Add Sport
              </Link>
            ) : (
              <Link
                onClick={() => setOpen(!open)}
                to="/"
                className="hover:bg-sky-500  mx-5  min-w-fit text-center border-y-2 md:border-2 border-blue-400  px-5 py-2 md:rounded-3xl"
              >
                Events
              </Link>
            )}
            {id === undefined ? (
              <>
                <Link
                  onClick={() => setOpen(!open)}
                  className="hover:bg-sky-500 mt-5 md:mt-0 text-center border-y-2 min-w-fit md:border-2  mx-5 border-blue-400 px-5 py-2 md:rounded-3xl"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  className="hover:bg-sky-500 mt-5 md:mt-0 border-y-2 text-center md:border-2  ml-5  min-w-fit border-blue-400 px-5 py-2 md:rounded-3xl"
                  to="/login"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {admin === false ? (
                  <Link
                    onClick={() => setOpen(!open)}
                    to="/event"
                    className="hover:bg-sky-500 mt-5  min-w-fit text-center md:mt-0 mx-5 border-y-2 md:border-2 border-blue-400 px-5 py-2 md:rounded-3xl"
                  >
                    Create Event
                  </Link>
                ) : (
                  <Link
                    onClick={() => setOpen(!open)}
                    to="/add-city"
                    className="hover:bg-sky-500 mt-5  min-w-fit text-center md:mt-0 mx-5 border-y-2 md:border-2 border-blue-400 px-5 py-2 md:rounded-3xl"
                  >
                    Add City
                  </Link>
                )}
                <Link
                  onClick={() => setOpen(!open)}
                  to="/profile"
                  className="hover:bg-sky-500 flex items-center  min-w-fit	 justify-around gap-x-2 md:mt-0 mx-5 mt-5 border-y-2 md:border-2 border-blue-400 px-5 py-1 md:rounded-3xl"
                  state={id._id}
                >
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/66bdd430-0a38-4d96-8842-0b29cf6a485a/iXqeSGxSKx.json"
                    style={{
                      height: "36px",
                      width: "36px",
                    }}
                  ></Player>
                  {id.username}
                </Link>
                <button
                  className="hover:bg-sky-500 border-y-2 md:border-2 border-blue-400  min-w-fit text-center md:mt-0 md:ml-5 mx-5 md:mx-0 mt-5 px-5 py-2 md:rounded-3xl"
                  onClick={() => {
                    handleLogout(), setOpen(!open);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
