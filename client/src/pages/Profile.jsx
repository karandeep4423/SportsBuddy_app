import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../Store/features/profile-slice";
import { useSelector, useDispatch } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import moment from 'moment'

const Profile = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let userId = location.state;
  let dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfile({ userId, setLoading }));
  }, [userId]);

  let id = JSON.parse(localStorage.getItem("user"))?.details;

  return (
    <div className="max-w-screen-2xl m-auto">
      {loading ? (
       <Player
       className="w-72 h-72 "
       autoplay
       loop
       src="https://assets5.lottiefiles.com/private_files/lf30_yIyBUk.json"
     ></Player>
      ) : profile !== null ? (
        <div>
          <h1 className="text-center text-slate-700 text-4xl sm:text-6xl mt-5">Profile</h1>
          <div className="flex justify-around  m-4 flex-row-reverse  flex-wrap">
            <div className="w-1/2 ">
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_xyadoh9h.json"
              ></Player>
            </div>
            <div className=" relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl  flex-wrap z-auto w-96 xl:w-[28rem] mt-24 p-6 flex flex-col gap-y-6 text-2xl h-fit border-2 border-slate-300">
              <div className="sm:w-52 m-auto w-36 h-36 sm:h-52 -mt-24 sm:-mt-36  border-8 border-slate-200 rounded-full bg-sky-600">
                <Player
                  className="sm:h-52 h-36 "
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/packages/lf20_n1wgeaxb.json"
                ></Player>
              </div>
              <h1 className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold border-2 bg-slate-200 border-slate-300 text-sky-600 mt-0 p-2">
                Username:
                <span className="sm:pl-4 pl-2 font-medium ">
                  {profile?.postedBy?.username}
                </span>
              </h1>
              <h1 className="border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold bg-slate-200 border-slate-300 text-sky-600 p-2">
                Full name:
                <span className="sm:pl-4 pl-2 font-medium ">{profile?.fullname}</span>
              </h1>
              <h1 className="border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold bg-slate-200 border-slate-300 text-sky-600 p-2">
                From:
                <span className="sm:pl-4 pl-2 font-medium ">{profile?.location}</span>
              </h1>
              <h3 className="border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold bg-slate-200 border-slate-300 text-sky-600 p-2">
                Bio:<span className="sm:pl-4 pl-2 font-medium ">{profile?.bio}</span>
              </h3>
              <h3 className="border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold bg-slate-200 border-slate-300 text-sky-600 p-2">
                Favorite Sports:
                <span className="sm:pl-4 pl-2 font-medium ">
                  {profile?.favoriteSport?.map((item) => item)}
                </span>
              </h3>
              <h3 className="border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold bg-slate-200 border-slate-300 text-sky-600 p-2">
                Join on:
                <span className="sm:pl-4 pl-2 font-medium ">{moment(profile?.date).format('MMMM Do YYYY')}</span>
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {userId !== id?._id ? (
            <div>
              <h1 className="text-center font-medium mt-5 text-slate-700 text-2xl sm:text-6xl">User have not setup profile yet</h1>
              <div className="w-1/2 m-auto">
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_0klv7hiw.json"
              ></Player>
              </div>
            </div>
          ) : (
            <div>
            <h1 className ="text-5xl font-medium text-slate-700 text-center mt-8">Profile</h1>
            <div className="flex-wrap gap-y-10 flex justify-around items-center ">
              <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-8 border-slate-300 text-xl  p-6 h-fit mt-10 sm:-mt-20 max-w-fit">
              <h3 className=""><span className="text-sky-600">{id?.username}</span>,Please setup your profile</h3>
              <button className="h-fit  min-w-fit p-2 px-4 bg-sky-600 text-white mt-5 rounded-3xl border-2 border-slate-200" onClick={() => navigate("/register_profile")}>
                Create Profile
              </button>
              </div>
              <div className="w-1/2  -mt-14">
              <Player
                autoplay
                loop
                src="https://assets6.lottiefiles.com/packages/lf20_0klv7hiw.json"
              ></Player>
              </div>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
