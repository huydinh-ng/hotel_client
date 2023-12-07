import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        people: Number(state.options.adult) + Number(state.options.children),
        room: state.options.room,
        city: state.destination,
        // min: state.min || 0,
        // max: state.max || 999,
        dateStart: state.dates.startDate,
        dateEnd: state.dates.endDate,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
