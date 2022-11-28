import React, { useState, useEffect } from "react";
import {
  addCity,
  updateCity,
  deleteCity,
  getCities,
} from "../../Store/features/admin-slice";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";

const AddCity = () => {
  const [city, setCity] = useState("");
  const data = useSelector((state) => state.admin);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const addToCity = async (e) => {
    e.preventDefault();
    dispatch(addCity(city));
    dispatch(getCities());
    setCity("");
  };

  const deleteToCity = async (id) => {
    dispatch(deleteCity(id));
    dispatch(getCities());
  };

  const updateToCity = async (id,value) => {
    const city = window.prompt("Enter updated  city",value);
    dispatch(updateCity({ id, city }));
    dispatch(getCities());
  };
  return (
    <div>
      <div className="my-10 flex flex-wrap justify-evenly gap-10 mx-4 ">
        <h1 className="text-5xl ">List of Cities</h1>
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
              placeholder="search city or add city"
              value={city}
              type="search"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></input>
          </div>
          <button
            className=" rounded-full text-white hover:bg-sky-500 bg-sky-600 w-32 h-12 "
            onClick={addToCity}
          >
            Add Sport
          </button>
        </form>
      </div>
      <div className="grid-cols-fluid justify-around  m-6 grid gap-6 ">
        {data?.cities?.filter((item) => item?.city?.toLowerCase().includes(city))
          .map((item, index) => (
          <div className=" bg-[url('admin-city.png')] bg-cover opacity-80 bg-[rgba(0,0,0,0.5)]  min-w-36 min-h-36   rounded-full  ">
            <div className="flex justify-center items-center p-2 flex-col  h-36  rounded-full   bg-[rgba(0,0,0,0.5)]   w-36  ">
              <p
                className="text-white first-letter:uppercase text-center  font-bold  break-all text-xl"
                key={index}
              >
                {item.city}
              </p>
              <div className="flex gap-x-8 gap-y-16 mt-3">
                <button  onClick={() => updateToCity(item._id,item.city)}>
                  <img className="w-5 h-5" src="edit-icon.png"></img>
                </button>
                <button className="" onClick={() => deleteToCity(item._id)}>
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

export default AddCity;
