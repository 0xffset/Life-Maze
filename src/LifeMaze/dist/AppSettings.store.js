"use strict";
var _a;
exports.__esModule = true;
exports.selectCurrentTheme = exports.toggleOpenEditor = exports.rotateTheme = exports.appSettingsSlide = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var utils_1 = require("../App/components/utils");
// Define the initial state using that type
var savedTheme = utils_1.getCookie("theme");
var initialState = {
    currentTheme: ["light", "dark", "auto"].includes(savedTheme) ? savedTheme : "auto",
    editorIsOpen: false
};
exports.appSettingsSlide = toolkit_1.createSlice({
    name: "editor",
    initialState: initialState,
    reducers: {
        rotateTheme: function (state) {
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
            document.cookie = "theme=" + state.currentTheme + ";max-age=86400";
        },
        toggleOpenEditor: function (state) {
            state.editorIsOpen = !state.editorIsOpen;
        }
    }
});
// Action creators are generated for each case reducer function
exports.rotateTheme = (_a = exports.appSettingsSlide.actions, _a.rotateTheme), exports.toggleOpenEditor = _a.toggleOpenEditor;
exports.selectCurrentTheme = function (state) { return state.appSettings.currentTheme; };
// Other code such as selectors can use the imported `RootState` type
// export const selectNodes = (state: RootState) => state.counter.nodes;
exports["default"] = exports.appSettingsSlide.reducer;
