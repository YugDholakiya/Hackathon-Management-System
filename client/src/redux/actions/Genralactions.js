import { getMethod, postMethod, deleteMethod, putMethod } from "../../utils/axiosInstance/axiosInstance";
import { getUsers } from "../../utils/axiosInstance/axiosInstance";


export const formatDate = (dateString) => {
  if (!dateString) return "";
  const cleanDate = dateString.split("T")[0];
  const parts = cleanDate.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dateString;
};


const getCurrentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // Month is zero-based, so we add 1
    day: now.getDate()
  };
};

// const compareDates = (dateString, comparisonType) => {
//   const currentDate = getCurrentDate();
//   const givenDate = {
//     year: parseInt(dateString.substring(0, 4)),
//     month: parseInt(dateString.substring(5, 7)),
//     day: parseInt(dateString.substring(8, 10))
//   };

//   const currentDateValue = currentDate.year * 10000 + currentDate.month * 100 + currentDate.day;
//   const givenDateValue = givenDate.year * 10000 + givenDate.month * 100 + givenDate.day;

//   if (comparisonType === "equal") {
//     return currentDateValue === givenDateValue;
//   } else if (comparisonType === "greaterThan") {
//     return currentDateValue < givenDateValue;
//   } else if (comparisonType === "lessThan") {
//     return currentDateValue > givenDateValue;
//   } else {
//     throw new Error("Invalid comparison type");
//   }
// };


const compareDates = (dateString, comparisonType) => {
  const currentDate = getCurrentDate();
  const givenDate = {
    year: parseInt(dateString.substring(0, 4)),
    month: parseInt(dateString.substring(5, 7)),
    day: parseInt(dateString.substring(8, 10))
  };

  const currentDateValue = currentDate.year * 10000 + currentDate.month * 100 + currentDate.day;
  const givenDateValue = givenDate.year * 10000 + givenDate.month * 100 + givenDate.day;

  if (comparisonType === "equal") {
    return currentDateValue === givenDateValue;
  } else if (comparisonType === "greaterThan") {
    return currentDateValue < givenDateValue;
  } else if (comparisonType === "lessThan") {
    return currentDateValue > givenDateValue;
  } else {
    throw new Error("Invalid comparison type"); // This error is thrown when the comparison type is invalid
  }
};
console.log(compareDates("2024-06-03", "greaterThan")); // true
console.log(compareDates("2024-04-11", "equal")); // true




export function workSuccess(value=false){
  return value;
}

export function getParticipantsAction(participantsData) {
  return {
    type: "SET-ALL-PARTICIPANTS",
    payload: participantsData,
  };
}

export function getHostsAction(hostsData) {
  return {
    type: "SET-ALL-HOSTS",
    payload: hostsData,
  };
}

export function getHackathonsAction(hackathonsData) {
  return {
    type: "SET-ALL-HACKATHONS",
    payload: hackathonsData,
  };
}

export function getHackathonsApplicationsAction(hackathonsApplicationsData) {
  return {
    type: "SET-ALL-HACKATHONS-APPLICATIONS",
    payload: hackathonsApplicationsData,
  };
}

export function generalThunkFunction(methodName, data) {
  let result;
  return async function (dispatch) {
    switch (methodName) {
      case "getAllParticipants":
        result = await getUsers(
          "participants",
          "http://localhost:8000/participants"
        );
        console.log(result.data);
        if (result.success) {
          dispatch(getParticipantsAction(result.data));
        }

        break;
      case "getAllHosts":
        result = await getUsers("hosts", "http://localhost:8000/hosts");
        if (result.success) {
          dispatch(getHostsAction(result.data));
        }

        break;
        case "getAllHackathons":
          result = await getUsers("hosts", "http://localhost:8000/hackathons");
          if (result.success) {
            const currentDate = getCurrentDate(); // Define currentDate here
        
            console.log(result.data);
        
            const newResult = result.data.map((hackathon) => {
              const regStart = hackathon.dates.registrationStart;
              const regEnd = hackathon.dates.registrationEnd;
              const hackEnd = hackathon.dates.hackathonEnd;
        
              const parseDateValue = (dateStr) => {
                if (!dateStr) return 0;
                const year = parseInt(dateStr.substring(0, 4));
                const month = parseInt(dateStr.substring(5, 7));
                const day = parseInt(dateStr.substring(8, 10));
                return year * 10000 + month * 100 + day;
              };
        
              const cur = currentDate.year * 10000 + currentDate.month * 100 + currentDate.day;
              const rStart = parseDateValue(regStart);
              const rEnd = parseDateValue(regEnd);
              const hEnd = parseDateValue(hackEnd);
        
              if (cur > hEnd) {
                return null; // Ended hackathons are removed
              } else if (cur < rStart) {
                return { ...hackathon, hackathonStatus: "UpComing" };
              } else if (cur >= rStart && cur <= rEnd) {
                return { ...hackathon, hackathonStatus: "Open" };
              } else {
                return { ...hackathon, hackathonStatus: "Closed" };
              }
            }).filter(h => h !== null);
        
            console.log(newResult);
        
            dispatch(getHackathonsAction(newResult));
          }
          break;
        
      case "getAllHackathonsApplications":
        result = await getUsers(
          "hackathonApplications",
          "http://localhost:8000/hackathonApplications"
        );

        console.log(result)
        if (result.success) {
          dispatch(getHackathonsApplicationsAction(result.data));
        }

        break;

      case "AddNewHackathon":
        
        console.log(data.id);
        const newHackathonDetails = {
          id: data.id,
          hackathonStatus: data.status,
          hostId: "1",
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          prizes: {
            prizePool: data.prizes,
            perks: data.perks,
          },
          techstacks: data.techstacks,
          dates: {
            registrationStart: data.registrationStart,
            registrationEnd: data.registrationEnd,
            hackathonStart: data.hackathonStart,
            hackathonEnd: data.hackathonEnd,
          },
          teamSize: {
            max: data.teamMax,
            min: data.teamMin,
          },

          mode: data.mode,
          location: data.location,
        };
        console.log(newHackathonDetails.id)

        result = await postMethod(
          
          "http://localhost:8000/hackathons", JSON.stringify(newHackathonDetails)
        );
        console.log(result);
        if (result.success) {
          workSuccess(true);
          return true;
        }
        return false;

      case "DeleteHackathon":
        result = await deleteMethod(`http://localhost:8000/hackathons/${data}`);
        if (result.success) {
          workSuccess(true);
          return true;
        }
        return false;

      case "UpdateHackathon":
        const updateHackathonDetails = {
          name: data.name,
          status: data.status,
          tagline: data.tagline,
          description: data.description,
          prizes: {
            prizePool: data.prizes,
            perks: data.perks,
          },
          techstacks: data.techstacks,
          dates: {
            registrationStart: data.registrationStart,
            registrationEnd: data.registrationEnd,
            hackathonStart: data.hackathonStart,
            hackathonEnd: data.hackathonEnd,
          },
          teamSize: {
            max: data.teamMax,
            min: data.teamMin,
          },
          mode: data.mode,
          location: data.location,
        };

        result = await putMethod(
          `http://localhost:8000/hackathons/${data.id}`, JSON.stringify(updateHackathonDetails)
        );
        if (result.success) {
          workSuccess(true);
          return true;
        }
        return false;

        case "addHackathonApplication":
  
        
        
        const newHackathonApplication = {
          
            id: data.id,
            hackathonId: data.hackathonId,
            hackathonName: data.hackathonName,
            applicationStatus: "pending",
            leaderId: data.leaderId,
            leadeName:data.name,
            teamDetails:data.teamDetails,
            problemStatementAbstract: data.problemStatementAbstract,
            solutionStatement: "",
            technologyUsed: data.technologyUsed
          
        }
        console.log(newHackathonApplication.id)

        result = await postMethod(
          
          "http://localhost:8000/hackathonApplications", JSON.stringify(newHackathonApplication)
        );
        console.log(result);
        if (result.success) {
          return true;
        }
        return false;





      // if (result.success === true) dispatch(setRole(result.data, role));

      default:
        break;
    }
  };
}
