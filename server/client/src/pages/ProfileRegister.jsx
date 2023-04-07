import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerProfile } from "../Store/features/profile-slice";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function ProfileRegister() {
  const [fullname, setFullname] = useState("");
  const [location, setLocation] = useState("");
  const [favoriteSport, setFavoriteSport] = useState("");
  const [bio, setBio] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  let id = JSON.parse(localStorage.getItem("user"))?.details;

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const submit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const profileData = {
      fullname,
      location,
      favoriteSport,
      bio,
      postedBy: `${id._id}`,
    };
    if (fullname && location && favoriteSport && bio) {
      await dispatch(registerProfile(profileData));
      toast.success("Your profile has been registered");
      navigate("/")
      setBtnLoader(true);
    } else {
      toast.warning("All fields are required");
    }
  };

  return (
    <div className="max-w-screen-2xl m-auto">
      <h1 className="text-5xl text-center font-medium mt-8">Register Profile</h1>
      <div className="flex flex-row-reverse justify-around items-center m-10">
        <div className="invisible md:visible md:mt-24 w-[500px] h-[450px] xl:w-[800px] xl:h-[750px]">
          <img src="register-profile.jpg"></img>
        </div>
        <div className="absolute md:relative mt-20 md:mt-0">
          <form
            className="flex-wrap mt-14 xl:mt-0  shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl h-fit p-6 flex flex-col gap-y-6 max-w-fit border-2 border-slate-200 "
            method="POST"
          >
            <div className="h-36 w-36 -mt-24 m-auto bg-sky-600 rounded-full">
              <Player
                autoplay
                loop
                src="https://lottie.host/0813cddc-e4f7-47c0-ad9d-8d6bc4d27524/Y4eTIzL1ow.json"
              ></Player>
            </div>
            <div className="relative  cursor-pointer">
              <input
                className="h-11  w-72 px-3 text-xl text-black    border-slate-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                type="text"
                name="Full name"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              ></input>
              <span className="text-xl -my-3    pointer-events-none  text-black absolute left-3 top-5 px-1 transition duration-200 profile-input-text">
                Full name
              </span>
            </div>
            <div className="relative  cursor-pointer">
              <input
                className="h-11  w-72 px-3 text-xl text-black  border-slate-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                required
                type="text"
                value={location}
                name="location"
                onChange={(e) => setLocation(e.target.value)}
              ></input>
              <span className="text-xl -my-3    pointer-events-none  text-black absolute left-3 top-5 px-1 transition duration-200 profile-input-text">
                Location
              </span>
            </div>
            <div className="relative  cursor-pointer">
              <input
                className="h-11  w-72 px-3 text-xl text-black     border-slate-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                required
                type="text"
                value={favoriteSport}
                name="favoriteSport"
                onChange={(e) => setFavoriteSport(e.target.value)}
              ></input>
              <span className="text-xl -my-3    pointer-events-none  text-black absolute left-3 top-5 px-1 transition duration-200 profile-input-text">
                Favorite Sports
              </span>
            </div>
            <div className="relative  cursor-pointer">
              <textarea
                className="h-24  w-72 px-3 text-xl text-black   border-slate-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                required
                type="text"
                value={bio}
                name="bio"
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <span className="text-xl -my-3  pointer-events-none  text-black absolute left-4 top-5 px-1 transition duration-200 profile-textarea-text">
                Bio
              </span>
            </div>
            {btnLoader == true ? (
              <button className="cursor-not-allowed w-72 text-white  h-11 text-xl bg-sky-600 rounded-full ">
                <ClipLoader className="  mt-1.5 m-auto" size={28} />
              </button>
            ) : (
              <button
                className="w-72 text-white  h-11 text-xl bg-sky-600 rounded-full "
                onClick={submit}
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileRegister;
