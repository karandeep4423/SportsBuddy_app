import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getSport = createAsyncThunk("getSport", async () => {
  try {
    const response = await api.getSport();
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const getCities = createAsyncThunk("getCities", async () => {
  try {
    const response = await api.getCities();
    return response.data;
  } catch (err) {
    return err;
  }
});

export const addSport = createAsyncThunk("createSport", async (sportData) => {
  try {
    const response = await api.addSport(sportData);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const updateSport = createAsyncThunk(
  "updateSport",
  async ({ id, sport }) => {
    try {
      const response = await api.updateSport(id, sport);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteSport = createAsyncThunk("deleteSport", async (id) => {
  try {
    const response = await api.deleteSport(id);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const addCity = createAsyncThunk("createCity", async (city) => {
  try {
    const response = await api.addCity(city);
    return response.data;
  } catch (err) {
    return err;
  }
});
export const updateCity = createAsyncThunk(
  "updateCity",
  async ({ id, city }) => {
    try {
      const response = await api.updateCity(id, city);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
export const deleteCity = createAsyncThunk("deletecity", async (id) => {
  try {
    const response = await api.deleteCity(id);
    return response.data;
  } catch (err) {
    return err;
  }
});


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    cities: [],
    sports: [],
    city:{},
    error: "",
    loading: false,
  },
  extraReducers: {
    [getSport.pending]: (state, action) => {
      state.loading = true;
    },
    [getSport.fulfilled]: (state, action) => {
      state.loading = false;
      state.sports = action.payload;
    },
    [getSport.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getCities.pending]: (state, action) => {
      state.loading = true;
    },
    [getCities.fulfilled]: (state, action) => {
      state.loading = false;
      state.cities = action.payload;
    },
    [getCities.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [addSport.pending]: (state, action) => {
      state.loading = true;
    },
    [addSport.fulfilled]: (state, action) => {
      state.loading = false;
      state.sport = action.payload;
    },
    [addSport.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSport.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSport.fulfilled]: (state, action) => {
      state.loading = false;
      state.sport = action.payload;
    },
    [updateSport.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSport.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSport.fulfilled]: (state, action) => {
      state.loading = false;
      state.sport = action.payload;
    },
    [deleteSport.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [addCity.pending]: (state, action) => {
      state.loading = true;
    },
    [addCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.cities = action.payload;
    },
    [addCity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCity.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.city = action.payload;
    },
    [updateCity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCity.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.city = action.payload;
    },
    [deleteCity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const admin = adminSlice.actions;
export default adminSlice;
