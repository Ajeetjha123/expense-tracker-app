const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, darkTheme: !state.darkTheme };
    default:
      return state;
  }
};
export default themeReducer;
