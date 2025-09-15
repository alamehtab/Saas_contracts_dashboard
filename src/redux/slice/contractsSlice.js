import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContracts = createAsyncThunk(
  "contracts/fetchContracts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/contracts.json");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchContractById = createAsyncThunk(
  "contracts/fetchContractById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch("/contracts.json");
      const data = await res.json();
      const contract = data.find((c) => c.id === id);
      return contract;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contractSlice = createSlice({
  name: "contracts",
  initialState: {
    list: [],
    selected: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchContractById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchContractById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchContractById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.selected = null;
      });
  },
});

export default contractSlice.reducer;
