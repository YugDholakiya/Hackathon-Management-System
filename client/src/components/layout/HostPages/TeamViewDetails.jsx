import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplication } from "../../../utils/axiosInstance/axiosInstance";

function TeamViewDetails() {
  const [teamDetails, setTeamDetails] = useState([]);
  const [leaderName, setLeaderName] = useState("");
  const [problemStatement, setProblemStatement] = useState("");

  const { applicationId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getApplication(
          `http://localhost:8000/hackathonApplications/${applicationId}`
        );
        console.log(result);
        if (result.success) {
          console.log();
          setTeamDetails(result.data.teamDetails || []);
          setLeaderName(result.data.leadeName || "");
          setProblemStatement(result.data.problemStatementAbstract || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [applicationId]);

  console.log(teamDetails);
  console.log(leaderName);
  console.log(problemStatement);

  return (
    <div className="   text-start h-[100vh] flex flex-col items-center justify-center text-2xl p-2 ">
      <div className=" w-ful md:w-auto p-10 shadow-md shadow-blue-500 rounded-md">
        <div className="font-bold">Leader Name: <span className="font-normal"> {leaderName}</span></div>
        <p className="font-bold">Problem Statement: <span className="font-normal">{problemStatement}</span> </p>
        <div >
          Team Details:
          {teamDetails && teamDetails.length > 0
            ? teamDetails.map((teamMember, index) => (
                <React.Fragment key={index}>
                  <div className="font-bold">
                    Team Member {index + 1} : <span className="font-normal">{teamMember.name || teamMember.firstName}</span>
                  </div >
                  <div className="font-bold">Member Email : <span className="font-normal">{teamMember.email}</span> </div>
                </React.Fragment>
              ))
            : "no details Available"}
        </div>
      </div>
    </div>
  );
}

export default TeamViewDetails;
