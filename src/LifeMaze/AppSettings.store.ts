import { RootState } from "./store";
import { ThemeType } from "./theme";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../App/components/utils";

// Define a type for the slice state
interface appSettingsSliceState {
  currentTheme: ThemeType;
  editorIsOpen: boolean;
}

// Define the initial state using that type
const savedTheme = getCookie("theme") as ThemeType;
const initialState: appSettingsSliceState = {
  currentTheme: ["light", "dark", "auto"].includes(savedTheme)
    ? savedTheme
    : "auto",
  editorIsOpen: false,
};

export const appSettingsSlide = createSlice({
  name: "editor",
  initialState,
  reducers: {
    rotateTheme: (state) => {
      switch (state.currentTheme) {
        case "light": {
          state.currentTheme = "dark";
          break;
        }
        case "dark":
          state.currentTheme = "auto";
          break;
        case "auto":
          state.currentTheme = "light";
      }

      document.cookie = `theme=${state.currentTheme};max-age=86400`;
    },
    toggleOpenEditor: (state) => {
      state.editorIsOpen = !state.editorIsOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rotateTheme, toggleOpenEditor } = appSettingsSlide.actions;
export const selectCurrentTheme = (state: RootState) =>
  state.appSettings.currentTheme;

// Other code such as selectors can use the imported `RootState` type
// export const selectNodes = (state: RootState) => state.counter.nodes;

export default appSettingsSlide.reducer;
