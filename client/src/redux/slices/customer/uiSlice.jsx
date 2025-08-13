
import { createSlice } from '@reduxjs/toolkit';

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
const savedLanguage = localStorage.getItem('language') || 'english';

const initialState = {
  darkMode: savedDarkMode,
  language: savedLanguage,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
      
      if (state.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
    
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
      
    },
  },
});

export const { toggleDarkMode, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
