import axios from "axios";
const API = axios.create({ baseURL: "https://sportsbuddy-qpoe.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user"))?.token
    }`;
  }
  return req;
});

export const loginIn = (loginDetails) => API.post("/login", loginDetails);
export const register = (initialValues) => API.post("/register", initialValues);
export const googleLogin = (result) => API.post("/google-login", result);
export const createEvent = (eventData) => API.post("/event", eventData);
export const deleteEvent = (deleteId) => API.delete(`/${deleteId}`);
export const getEvents = () => API.get("/find");
export const getEvent = (eventID) => API.get(`/find${eventID}`);
export const addToComment = (commentValue, id) =>API.put("/add_comment", { commentValue, id });
export const deleteToComment = (value, commentPostedBy, eventId) =>API.put("/delete_comment", { value, commentPostedBy, eventId });
export const joinToEvent = (eventId) => API.put("/join_event", { eventId });
export const updateToEvent = (id, updateEventData) =>API.put(`/${id}`, updateEventData );
export const getProfile = (userId) => API.get(`/profileuser/${userId}`);
export const registerProfile = (profileData) =>API.post("/profileuser", profileData);

// admin api calls
export const addSport = (sportData) =>
  API.post("/createsport", { sport: sportData });
export const getSport = () => API.get("/get");
export const getCities = () => API.get("/getcities");
export const updateSport = (id, sport) =>API.put(`/updatesport/${id}`, { sport: sport });
export const deleteSport = (id) => API.delete(`/delete/${id}`);
export const addCity = (city) => API.post("/city", { city: city });
export const updateCity = (id, city) =>API.put(`/updatecity/${id}`, { city: city });
export const deleteCity = (id) => API.delete(`/deletecity/${id}`);
