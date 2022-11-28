import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../Store/features/event-slice";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Player } from "@lottiefiles/react-lottie-player";

const Events = () => {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  const events = useSelector((state) => state.event.events);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const data = events.filter((item) => item?.name?.toLowerCase().includes(search)||item?.city?.toLowerCase().includes(search)||item?.sport?.toLowerCase().includes(search));

  return (
    <div>
      <div className="mt-10 flex flex-wrap justify-evenly gap-10 mx-4 ">
        <h1 className="text-5xl  text-slate-700">List of Events</h1>
        <div className="flex flex-row ">
          <div className="-mt-1 absolute">
          <Player
            className="w-14 h-14 "
            autoplay
            loop
            src="https://lottie.host/3c0747d6-bc85-436f-b6cd-b6a9cc8f66fd/U06LFwTrSo.json"
          ></Player>
          </div>
          <input
            className=" w-80 sm:text-xl focus:outline-blue-600 bg-blue-100 h-12 rounded-3xl border-2 border-blue-400 pl-12 pr-6 sm:pl-14 sm:pr-4 "
            placeholder="search by name, city,sport"
            value={search}
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className=" p-4  lg:p-8 sm:p-6 gap-6 flex justify-around items-center flex-wrap">
        {data?.length !== 0
          ? data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" w-80 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  min-h-96 border-2 border-sky-100"
                >
                  <div className="hover:animate-wiggle   shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]    h-48 rounded-2xl w-full ">
                    <img
                      className="object-cover w-full  shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-2 h-48 rounded-2xl"
                      src={item.imageData}
                    ></img>
                  </div>
                  <div className="flex max-h-48 flex-col m-4 gap-4 ">
                    <div className=" text-3xl  flex justify-around items-center min-h-10 w-full ">
                      <h1 className="text-slate-600 first-letter:uppercase">{item.name}</h1>
                    </div>
                    <div className="flex justify-around items-center  text-2xl min-h-10 border-black">
                      <div className="flex mr-2 ">
                        <img
                          className="h-8 pb-1 pr-0.5 w-8"
                          src="area-icon.png"
                        ></img>
                        <h1 className="min-h-8 font-light break-all first-letter:uppercase">{item.city}</h1>
                      </div>
                      <div className="flex ">
                        <img className="h-8 w-8" src="sports-icon.png"></img>
                        <h1 className="min-h-8 font-light break-all first-letter:uppercase">{item.sport}</h1>
                      </div>
                    </div>
                    <Link to="/event-detail" state={item._id}>
                      <div className="rounded-full bg-sky-600  hover:bg-sky-500 flex justify-around items-center  h-10 ">
                        <button className="flex text-white text-xl">
                          M
                          <img
                            className="w-4 h-4 mt-2  rounded-full"
                            src="icon-ball.gif"
                          ></img>
                          RE INF
                          <img
                            className="w-4 h-4 mt-2 rounded-full"
                            src="icon-ball.gif"
                          ></img>
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          : events.length === 0
          ?<Player
          className="w-72 h-72 "
          autoplay
          loop
          src="https://assets5.lottiefiles.com/private_files/lf30_yIyBUk.json"
        ></Player>
          : "NO Events Found"}
      </div>
    </div>
  );
};

export default Events;
