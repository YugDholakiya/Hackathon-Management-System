import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import {
  updateApplication,
  deleteUser,
} from "../../../utils/axiosInstance/axiosInstance";
function MainListItem({ cardData, pageName ,handleUpdateFlag}) {
  const navigate = useNavigate();
  console.log(cardData);

  function handleAccept(id) {
    const newApplicationData = { ...cardData, applicationStatus: "accepted" };
    console.log(newApplicationData);
    const result = updateApplication(
      `http://localhost:8000/hackathonApplications/${id}`,
      JSON.stringify(newApplicationData)
    );

    if(result.success){
      handleUpdateFlag();
    }
    console.log(result.success);
  }

  function handleReject(id) {
    const newApplicationData = { ...cardData, applicationStatus: "rejected" };
    console.log(newApplicationData);
    const result = updateApplication(
      `http://localhost:8000/hackathonApplications/${id}`,
      JSON.stringify(newApplicationData)
    );
    if(result.success){
      handleUpdateFlag();
    }
    console.log(result.success);
  }

  function handleDelete(id,cardRole) {
    let result;
if(cardRole === "participant")
{
result = deleteUser(`http://localhost:8000/participants/${id}`)


}
else if(cardRole === "host")
{
 result = deleteUser(`http://localhost:8000/hosts/${id}`)
console.log(result)

}
if(result.success){
  handleUpdateFlag();
}
  }

  return (
    <>
      <div
        href="#"
        className="bg-gray-100 flex flex-col md:flex-row text-gray-700 border-l-8 border-blue-500 rounded-md shadow-md shadow-blue-500 px-3 py-2 w-auto  h-auto md:h-[70px]"
      >
        <div className="w-full">
          <div className="font-bold">
            {pageName === "AdminMainPage" && cardData && cardData.firstName
              ? cardData.firstName
              : pageName === "HostApplicationsPage" &&
                cardData &&
                cardData.hackathonName
              ? `Hackathon Name: ${cardData.hackathonName}`
              : ""}
          </div>

          <div className="text-gray-500 font-bold text-sm pt-1">
            <span>
              {pageName === "AdminMainPage" && cardData && cardData.email
                ? cardData.email
                : pageName === "HostApplicationsPage" &&
                  cardData &&
                  cardData.teamDetails &&
                  cardData.teamDetails.length > 0
                ? `Team Members : ${cardData.teamDetails.length}`
                : ""}
            </span>
            {/* <span>MCQs: {mcqs}</span> */}
          </div>
        </div>

        <div className="w-full space-x-3   flex mt-2 md:mt-0 justify-center p-[1px] md:p-[4px] ">
          {pageName === "AdminMainPage" ? null : (
            <>
              {" "}
              <Button
                variant="green"
                buttonStyle="m-0 bg-green-500 text-xs md:text-sm font-bold py-1 md:py-1  "
                onClick={() => navigate(`/TeamViewDetailPage/${cardData.id}`)}
              >
                View Details
              </Button>
              {cardData &&
              cardData.applicationStatus &&
              cardData.applicationStatus.toUpperCase() === "ACCEPTED" ? (
                <div className="hidden">
                  {" "}
                  <Button></Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleAccept(cardData.id)}
                  variant="primary"
                  buttonStyle="m-0 bg-blue-500 text-xs md:text-sm font-bold py-1 md:py-1  "
                >
                  {pageName === "HostApplicationsPage" ? "Accept" : "Apply Now"}
                </Button>
              )}
            </>
          )}

          <Button
            onClick={() => {
              if (pageName === "HostApplicationsPage") {
                handleReject(cardData.id);
              } else if (
                pageName === "AdminMainPage" &&
                cardData &&
                cardData.roles &&
                cardData.roles.length > 0
              ) {
                handleDelete(cardData.id, cardData.roles[0]);
              }
            }}
            variant="danger"
            buttonStyle=" m-0 bg-red-700 text-xs md:text-sm font-bold md:py-1  px6"
          >
            {pageName === "HostApplicationsPage" ? "Reject" : "Delete"}
          </Button>
        </div>
      </div>
    </>
  );
}
export default MainListItem;
