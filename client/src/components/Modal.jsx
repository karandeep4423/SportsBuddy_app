import React, { useState, useEffect } from "react";
import {
  getEvent,
  getEvents,
  updateToEvent,
  deleteEvent,
} from "../Store/features/event-slice";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCities, getSport } from "../Store/features/admin-slice";
let id = JSON.parse(localStorage.getItem("user"))?.details;
const UpdateEventModal = () => {
  const event = useSelector((state) => state.event.eventData);
  const [name, setName] = useState(event?.name);
  const [sport, setSport] = useState(event?.sport);
  const [description, setDescription] = useState(event?.description);
  const [city, setCity] = useState(event?.city);
  const [location, setLocation] = useState(event?.location);
  const [date, setDate] = useState(event?.date);
  const [numberOfPlayer, setNumberOfPlayer] = useState(event?.numberOfPlayer);
  const [imageData, setImageData] = useState(event?.imageData);

  let dispatch = useDispatch();
  let eventLocation = useLocation();
  let eventID = eventLocation.state;

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const data = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getEvent(eventID));
    dispatch(getSport());
    dispatch(getCities());
  }, [dispatch]);

  const updateEvent = async (e) => {
    e.preventDefault();
    const updateEventData = {
      name,
      sport,
      description,
      city,
      location,
      date,
      numberOfPlayer,
      imageData,
    };
    const id = eventID;
    await dispatch(updateToEvent({ id, updateEventData }));
    await dispatch(getEvent(eventID));
  };

  return (
    <div>
      <div>
        {event?.postedBy?._id === id?._id ? (
          <button onClick={onOpenModal}>
            <img className="w-9 h-9" src="edit-icon.png"></img>
          </button>
        ) : null}
        <Modal open={open} onClose={onCloseModal} center>
          <form method="PUT">
            <div className="gap-5  mt-8 flex flex-wrap flex-col">
              <div className="grid-cols-1 sm:grid-cols-2 grid gap-4">
                <div className="relative cursor-pointer">
                  <input
                    className="h-11 w-full px-3 text-xl    border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="text"
                    name="event name"
                    value={name === undefined ? event?.name : name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <span className="text-xl -my-3    pointer-events-none  text-white absolute left-5 top-5 px-1 transition duration-200 profile-input-text">
                    Event Name
                  </span>
                </div>
                <div className="relative cursor-pointer ">
                  <select
                    value={sport === undefined ? event?.sport : sport}
                    className="h-11 w-full px-2 text-xl  border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500"
                    onChange={(e) => setSport(e.target.value)}
                  >
                    <option className="text-blue-500">Select Sport</option>
                    {data?.sports?.map((item, index) => (
                      <option key={index}>{item.sport}</option>
                    ))}
                  </select>
                </div>
                <div className="relative cursor-pointer">
                  <input
                    className="h-11 w-full px-3 text-xl    border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="number"
                    name="players"
                    onChange={(e) => setNumberOfPlayer(e.target.value)}
                    value={
                      numberOfPlayer === undefined
                        ? event?.numberOfPlayer
                        : numberOfPlayer
                    }
                  ></input>
                  <span className="text-xl -my-3    pointer-events-none   absolute left-4 top-5 px-1 transition duration-200 profile-input-number">
                    Number of Players
                  </span>
                </div>
                <div className="relative cursor-pointer">
                  <select
                    value={city === undefined ? event?.city : city}
                    className=" h-11 w-full px-2 text-xl  border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option className="text-blue-500">Select City</option>
                    {data?.cities?.map((item, index) => (
                      <option key={index}>{item.city}</option>
                    ))}
                  </select>
                </div>
                <div className="relative cursor-pointer">
                  <input
                    className="h-11 w-full px-3 text-xl    border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="text"
                    name="location"
                    value={location === undefined ? event?.location : location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></input>
                  <span className="text-xl -my-3    pointer-events-none   absolute left-6 top-5 px-1 transition duration-200 profile-input-text">
                    Location
                  </span>
                </div>
                <div className="relative  ">
                  <input
                    className="h-11 w-full px-3 text-xl   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500   transition duration-200"
                    type="date"
                    name="date"
                    value={date === undefined ? event?.date : date}
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                  <span className="text-xl -my-3 bg-white  transform -translate-y-6 -translate-x-2 scale-75   pointer-events-none  absolute left-5 top-5 px-1 profile-input-date ">
                    Date
                  </span>
                </div>
              </div>
              <div className="relative  cursor-pointer">
                <div className=" border-2 pt-1  px-1.5 h-11 border-black rounded-xl">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setImageData(base64)}
                  />
                </div>
                <span className="text-xl -my-3 text-blue-500 bg-white  transform -translate-y-6 -translate-x-2 scale-75   pointer-events-none   absolute left-36 top-5 px-1 ">
                  Upload Image
                </span>
              </div>
              <div className="relative">
                <textarea
                  className="h-24 pt-1 w-full px-3 text-xl   border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500  "
                  type="text"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={
                    description === undefined ? event?.description : description
                  }
                ></textarea>
                <span className="text-xl -my-3     pointer-events-none   absolute left-5 top-5 px-1 transition duration-200 profile-textarea-text">
                  Description
                </span>
              </div>
              <button
                onClick={(e) => {
                  updateEvent(e);
                  onCloseModal(e);
                }}
                className="text-xl h-11 min-w-max bg-sky-600 text-white rounded-3xl  hover:bg-sky-500  border-2 border-white"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

const DeleteModal = () => {
  const event = useSelector((state) => state.event.eventData);
  let dispatch = useDispatch();
  let location = useLocation();
  let eventID = location.state;
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getEvent(eventID));
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const Delete = async (deleteID) => {
    await dispatch(deleteEvent(deleteID));
    await dispatch(getEvents());
    navigate("/");
  };

  return (
    <div>
      {event?.postedBy?._id === id?._id ? (
        <button onClick={onOpenModal}>
          <img className="w-8 h-8" src="delete-icon.png"></img>
        </button>
      ) : null}
      <Modal open={open} onClose={onCloseModal} center>
        <h1 className="mr-8">Are you sure you want to delete this event?</h1>
        <div className="mt-4 gap-y-4 flex flex-row gap-x-12 flex-wrap">
          <button
            className="w-24 h-8 text-white rounded-xl bg-sky-600 hover:bg-sky-500"
            onClick={() => Delete(eventID)}
          >
            Yes
          </button>
          <button
            className="w-24 h-8 text-white rounded-xl bg-sky-600 hover:bg-sky-500"
            onClick={onCloseModal}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export { DeleteModal, UpdateEventModal };
