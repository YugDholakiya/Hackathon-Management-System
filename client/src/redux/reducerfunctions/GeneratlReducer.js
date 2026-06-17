import { API, getMethod } from "../../utils/axiosInstance/axiosInstance";

const initialState = {
  participants: [],
  hosts: [],
  admin: [],
  hackathons:[],
  hackathonApplications:[]
};

export function GeneralReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case "SET-ALL-PARTICIPANTS":
      newState = { ...state, participants: action.payload };
      return newState;

    case "SET-ALL-HOSTS":
      newState = { ...state, hosts: action.payload };
      return newState;

      case "SET-ALL-HACKATHONS":
        newState = { ...state, hackathons: action.payload };
        return newState;

        case "SET-ALL-HACKATHONS-APPLICATIONS":
      newState = { ...state, hackathonApplications: action.payload };
      return newState;



      default:
      return state;
  }
}
