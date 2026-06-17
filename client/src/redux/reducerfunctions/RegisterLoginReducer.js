import { API, getMethod } from "../../utils/axiosInstance/axiosInstance";

const initialState = {
  role: undefined,
  isAuth: false,
  roleDetails: {},
};

export function RegisterLoginReducer(state = initialState, action) {
  switch (action.type) {
    case "SET-ROLE":
      const { userDetails, role, isAuth } = action.payload;
      const newState = {...initialState,role:role,isAuth:isAuth,roleDetails:userDetails}
      localStorage.setItem("userDetails", JSON.stringify(newState));

      // localStorage.setItem("role", JSON.stringify(role));
      // localStorage.setItem("roleDetails", JSON.stringify(userDetails));
    //   console.log(action.payload);

      return newState ;

    case  "SET-LOGOUT" : 
    localStorage.clear();
    return initialState;


    default:
      return state;
  }
}
