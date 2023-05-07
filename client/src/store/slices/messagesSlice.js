import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http as API } from '../../api';

const MESSAGES_SLICE_NAME = 'messages';

export const getMessagesThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await API.getMessages(payload);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 10,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,
  reducers: {
    createMessageFullfilled: function (state, action) {
      state.isFetching = false;
      state.error = null;

      if (state.messages.length >= state.limit) {
        state.messages.splice(0, 1);
      }
      state.messages.push(action.payload);
    },
    createMessageError: function (state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    // GET
    builder.addCase(getMessagesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = [];
      state.isFetching = false;
      state.messages.push(...payload.reverse());
    });
    builder.addCase(getMessagesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = messagesSlice;
export const { createMessageFullfilled, createMessageError } = actions;

export default reducer;
