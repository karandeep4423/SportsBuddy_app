import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEvent, getEvents } from "../Store/features/event-slice";
import FileBase64 from "react-file-base64";
import { getSport, getCities } from "../Store/features/admin-slice";
import ClipLoader from "react-spinners/ClipLoader";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [numberOfPlayer, setNumberOfPlayer] = useState("");
  const [imageData, setImageData] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const data = useSelector((state) => state.admin);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let id = JSON.parse(localStorage.getItem("user"))?.details;

  useEffect(() => {
    dispatch(getSport());
    dispatch(getCities());
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const eventData = {
      name,
      sport,
      description,
      city,
      location,
      date,
      numberOfPlayer,
      imageData,
      postedBy: `${id?._id}`,
    };
    if (
      name &&
      sport &&
      description &&
      city &&
      location &&
      date &&
      numberOfPlayer &&
      imageData
    ) {
      await dispatch(createEvent(eventData));
      dispatch(getEvents());
      setBtnLoader(false);
      navigate("/");
      toast.success("Event has been created successfully")
    } else {
      setBtnLoader(false);
      toast.warning("All fields are required");
    }
  };

  return (
    <div className=" bg-[url('bg.jpg')] bg-cover  bg-no-repeat w-full h-full   ">
      <div className="flex justify-around flex-wrap  ">
        <div className="m-4   rounded-3xl p-4 bg-[rgba(0,0,0,0.5)]   sm:m-10  min-w-96 min-h-96 border-2  border-black">
          <div className="animate-wiggle flex justify-around m-auto	 flex-row flex-wrap text-6xl">
            <h1 className=" ">H</h1>
            <img
              className="w-8 h-8 mt-5 rounded-full"
              src="icon-ball.gif"
            ></img>
            <h1>st </h1>
            <h1 className="pl-4">Y</h1>
            <img
              className="w-8 h-8 mt-5 rounded-full"
              src="icon-ball.gif"
            ></img>
            <h1>ur</h1>
            <h1 className="pl-4 m-auto sm:m-0">Event</h1>
          </div>
          <form method="POST">
            <div className="gap-5 mt-4 flex flex-col">
              <div className="grid-cols-1 sm:grid-cols-2 grid gap-4">
                <div className="relative cursor-pointer">
                  <input
                    className="h-11 w-full px-3 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="text"
                    name="event name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <span className="text-xl -my-3    pointer-events-none  text-white absolute left-2 top-5 px-1 transition duration-200 input-text">
                    Event Name
                  </span>
                </div>
                <div className="relative cursor-pointer ">
                  <select
                    required
                    value={sport}
                    className="h-11 first-letter:uppercase w-full px-1 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500"
                    onChange={(e) => setSport(e.target.value)}
                  >
                    <option>Select Sport</option>
                    {data?.sports?.map((item, index) => (
                      <option  key={index}>{item.sport}</option>
                    ))}
                  </select>
                </div>
                <div className="relative cursor-pointer">
                  <input
                    className="h-11 w-full px-3 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="number"
                    name="players"
                    onChange={(e) => setNumberOfPlayer(e.target.value)}
                    value={numberOfPlayer}
                    required
                  ></input>
                  <span className="text-xl -my-3    pointer-events-none  text-white absolute left-2 top-5 px-1 transition duration-200 input-text">
                    Number of Players
                  </span>
                </div>
                <div className="relative cursor-pointer">
                  <select
                    required
                    value={city}
                    className=" h-11 w-full px-1 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option>Select City</option>
                    {data?.cities?.map((item, index) => (
                      <option key={index}>{item.city}</option>
                    ))}
                  </select>
                </div>
                <div className="relative cursor-pointer">
                  <input
                    className="h-11 w-full px-3 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="text"
                    name="location"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></input>
                  <span className="text-xl -my-3    pointer-events-none  text-white absolute left-2 top-5 px-1 transition duration-200 input-text">
                    Location
                  </span>
                </div>
                <div className="relative  ">
                  <input
                    className="h-11 w-full px-3 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="date"
                    name="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                  <span className="text-xl -my-3 bg-[rgba(0,0,0,0.5)]  transform -translate-y-6 -translate-x-2 scale-75   pointer-events-none  text-white absolute left-2 top-5 px-1 ">
                    Date
                  </span>
                </div>
              </div>
              <div className="relative  cursor-pointer">
                <div className="bg-[rgba(0,0,0,0.5)] border-2 pt-1 text-white px-2 h-11 border-black rounded-xl">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setImageData(base64)}
                  />
                </div>
                <span className="text-xl -my-3 bg-[rgba(0,0,0,0.5)]  transform -translate-y-6 -translate-x-2 scale-75   pointer-events-none  text-white absolute left-36 top-5 px-2 ">
                  Upload Image
                </span>
              </div>
              <div className="relative">
                <textarea
                  className="h-24 pt-1 w-full px-3 text-xl text-white  bg-[rgba(0,0,0,0.5)]   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500  "
                  type="text"
                  name="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
                <span className="text-xl -my-3    pointer-events-none  text-white absolute left-2 top-5 px-1 transition duration-200 textarea-text">
                  Description
                </span>
              </div>
              {btnLoader == true ? (
                <button className="cursor-not-allowed text-xl h-11 w-full text-white rounded-3xl  hover:bg-[rgba(0,0,0,0.5)]  border-2 border-white">
                  <ClipLoader className="  mt-1.5 m-auto" size={28} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="text-xl h-11 w-full text-white rounded-3xl  hover:bg-[rgba(0,0,0,0.5)]  border-2 border-white"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
