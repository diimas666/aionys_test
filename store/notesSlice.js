import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/notes';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

// Получить все заметки
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Создать заметку
export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ title, content }) => {
    const res = await axios.post(API_URL, { title, content });
    return res.data;
  }
);

// Обновить заметку
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, title, content }) => {
    const res = await axios.put(`${API_URL}/${id}`, { title, content });
    return res.data;
  }
);

// Удалить заметку
export const removeNote = createAsyncThunk('notes/removeNote', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchNotes
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch notes';
      })
      // createNote
      .addCase(createNote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // updateNote
      .addCase(updateNote.fulfilled, (state, action) => {
        const i = state.items.findIndex((n) => n.id === action.payload.id);
        if (i !== -1) state.items[i] = action.payload;
      })
      // removeNote
      .addCase(removeNote.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
