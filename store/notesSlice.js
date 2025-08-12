import { createSlice, nanoid } from '@reduxjs/toolkit';
const initialState = [
  {
    id: '1',
    title: 'Первая заметка',
    content: 'Текст заметки №1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Вторая заметка',
    content: 'Текст заметки №2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Третья заметка',
    content: 'Текст заметки №3',
    createdAt: new Date().toISOString(),
  },
];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(note) {
        return {
          payload: {
            id: nanoid(),
            createdAt: note.createdAt || new Date().toISOString(),
            ...note,
          },
        };
      },
    },

    deleteNote: {
      reducer(state, action) {
        return state.filter((n) => n.id !== action.payload);
      },
    },

    editNote: {
      reducer(state, action) {
        const { id, title, content } = action.payload;
        const existingNote = state.find((n) => n.id === id);
        if (existingNote) {
          existingNote.title = title;
          existingNote.content = content;
        }
      },
    },
  },
});

export const { editNote, deleteNote, addNote } = notesSlice.actions;
export default notesSlice.reducer;
