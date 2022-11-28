import React, { useState, useEffect } from "react";
import {
  addSport,
  getSport,
  deleteSport,
  updateSport,
} from "../../Store/features/admin-slice";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-modal/styles.css";
import { Player } from "@lottiefiles/react-lottie-player";

const AddSport = () => {
  const [sportValue, setSportValue] = useState("");
  const data = useSelector((state) => state.admin);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSport());
  }, []);

  const addToSport = async (e) => {
    e.preventDefault();
    dispatch(addSport(sportValue));
    dispatch(getSport());
    setSportValue("");
  };

  const deleteToSport = async (id) => {
    dispatch(deleteSport(id));
    dispatch(getSport());
  };

  const updateToSport = async (id,value) => {
    const sport =window.prompt("Enter Updated Sport",value)
    dispatch(updateSport({id,sport}));
    dispatch(getSport());
    setOpen(false);
  };

  return (
    <div>
      <div className="my-10 flex flex-wrap justify-evenly gap-10 mx-4 ">
        <h1 className="text-5xl ">List of Sports</h1>
        <form
          method="POST"
          className="flex flex-wrap justify-center gap-5 items-center"
        >
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
              placeholder="search sport or add Sport "
              value={sportValue}
              type="search"
              onChange={(e) => {
                setSportValue(e.target.value);
              }}
            ></input>
          </div>
          <button
            className=" rounded-full text-white hover:bg-sky-500 bg-sky-600 w-32 h-12 "
            onClick={addToSport}
          >
            Add Sport
          </button>
        </form>
      </div>
      <div className="grid-cols-fluid justify-around m-6 grid gap-6 ">
        {data?.sports
          ?.filter((item) => item?.sport?.toLowerCase().includes(sportValue))
          .map((item, index) => (
            <div className=" bg-[url('sports-icon.png')] bg-cover opacity-80 bg-[rgba(0,0,0,0.5)]  w-36 h-36   rounded-full  ">
              <div className="flex justify-center items-center p-2 flex-col  h-36  rounded-full   bg-[rgba(0,0,0,0.5)]   w-36  ">
                <p
                  className="text-white text-center first-letter:uppercase  font-bold  break-all text-xl"
                  key={index}
                >
                  {item.sport}
                </p>
                <div className="flex gap-x-8 gap-y-16 mt-3">
                <button  onClick={() => updateToSport(item._id,item.sport)}>
                  <img className="w-5 h-5" src="edit-icon.png"></img>
                </button>
                    <button onClick={() => deleteToSport(item._id)}>
                      <img className="w-5 h-5" src="delete-icon.png"></img>
                    </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddSport;
