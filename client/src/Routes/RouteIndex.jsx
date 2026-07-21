import React, { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import ViewDetailsPage from "../components/layout/HackathonPages/ViewDetailsPage";
// import HackathonsPage from "../components/layout/HackathonPages/HackathonsPage";
// import RegisterLogin from "../components/Login-Register/RegisterLogin";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
// import AddHackathonForm from "../components/layout/HackathonPages/AddHackathonsForm";
// import MainPage from "../components/common/MainPages/MainPage";
// import HostHackathonsPage from "../components/layout/HostPages/HostHackathonsPage";
// No Admin Main Page anymore
// import ApplyNow from "../components/layout/HackathonPages/ApplyNowPage";
// import Error404 from "../components/Error404";
// import Home from "../components/Home";
// import Layout from "../components/layout/Layout";
// import MainProfilePage from "../components/common/MainPages/MainProfilePage";
// import TeamViewDetails from "../components/layout/HostPages/TeamViewDetails";

// const useDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
// const role = useDetails?.role;
// const isAuth = useDetails?.isAuth;
// const roleDetails = useDetails?.roleDetails;

// console.log(useDetails);

const Error404 = React.lazy(() => import("../components/Error404"));
const Layout = React.lazy(() => import("../components/layout/Layout"));
const Login = React.lazy(() => import("../components/Login-Register/Login"));
const Cart = React.lazy(() => import("../components/Cart"));
const Home = React.lazy(() => import("../components/layout/Home/Home"));
const RegisterLogin = React.lazy(() =>
  import("../components/Login-Register/RegisterLogin")
);
const HackathonsPage = React.lazy(() =>
  import("../components/layout/HackathonPages/HackathonsPage")
);
const ApplyNow = React.lazy(() =>
  import("../components/layout/HackathonPages/ApplyNowPage")
);
const ViewDetailsPage = React.lazy(() =>
  import("../components/layout/HackathonPages/ViewDetailsPage")
);

const HostHackathonsPage = React.lazy(() =>
  import("../components/layout/HostPages/HostHackathonsPage")
);
const MainProfilePage = React.lazy(() =>
  import("../components/common/MainPages/MainProfilePage")
);
const MainPage = React.lazy(() =>
  import("../components/common/MainPages/MainPage")
);
const AddHackathonForm = React.lazy(() =>
  import("../components/layout/HackathonPages/AddHackathonsForm")
);
const EditHackathonForm = React.lazy(() =>
  import("../components/layout/HackathonPages/EditHackathonForm")
);
const TeamViewDetails = React.lazy(() =>
  import("../components/layout/HostPages/TeamViewDetails")
);
function Router() {
  // const condition = false;
  const loginState = useSelector((state) => state.registerLoginReducer);
  const dispatch = useDispatch();
  console.log(loginState);
  console.log(loginState.role);

  return createBrowserRouter([
    {
      path: "*",
      element: <Error404 />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <RegisterLogin login={true} />,
        },
        {
          path: "/register",
          element: <RegisterLogin login={false} />,
        },

        {
          path: "/hackathons",
          element: (
            <MainPage
              pageName="HackathonsPage"
              buttonMembers={["OPEN", "CLOSED", "UPCOMING"]}
              currentMember="OPEN"
            />
          ),
        },
        {
          path: "/viewDetailPage/:hackathonId",
          element: <ViewDetailsPage />,
        },

        {
          element: (
            <PrivateRoute
              isAuth={loginState.role === "participant" || loginState.role === "host" ? true : false}
            />
          ),
          children: [
            {
              path: "/applyNow/:hackathonId/:hackathonName",
              element: <ApplyNow />,
            },
          ],
        },
        {
          element: (
            <PrivateRoute
              isAuth={loginState.role === "participant" ? true : false}
            />
          ),
          children: [
            {
              path: "/ParticipantProfile",
              element: (
                <MainProfilePage
                  name={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? loginState.roleDetails[0].firstName
                      : ""
                  }
                  role={loginState ? loginState.role : "participant"}
                  gender={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? loginState.roleDetails[0].gender
                      : "male"
                  }
                  email={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? loginState.roleDetails[0].email
                      : "No Email Provided"
                  }
                  designation={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0 &&
                    loginState.roleDetails[0].designation
                      ? loginState.roleDetails[0].designation
                      : "Not Defined"
                  }
                  about={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0 &&
                    loginState.roleDetails[0].about
                      ? loginState.roleDetails[0].about
                      : "No Details"
                  }
                />
              ),
            },

            {
              path: "/ParticipantDashBoard/:participantId",
              element: (
                <MainPage
                  role="Participant"
                  ParticipantId={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0 &&
                    loginState.roleDetails[0].id
                      ? loginState.roleDetails[0].id
                      : "1"
                  }
                  pageName="ParticipantMainPage"
                  buttonMembers={["APPLIED HACKATHONS", "PAST HACKATHONS"]}
                  currentMember={"APPLIED HACKATHONS"}
                />
              ),
            },
          ],
        },
        {
          element: (
            <PrivateRoute
              isAuth={loginState.role === "host" ? true : false}
            />
          ),
          children: [
            {
              path: "/teamViewDetailPage/:applicationId",
              element: <TeamViewDetails />,
            },

            {
              path: "/addNewHackathon",
              element: <AddHackathonForm />,
            },
            {
              path: "/editHackathon/:hackathonId",
              element: <EditHackathonForm />,
            },
            {
              path: "/HostProfile",
              element: (
                <MainProfilePage
                  id={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? loginState.roleDetails[0].id
                      : "1"
                  }
                  name={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? loginState.roleDetails[0].firstName
                      : ""
                  }
                  role={loginState ? loginState.role : "host"}
                  email={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? loginState.roleDetails[0].email
                      : "No Email Provided"
                  }
                  tagline={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? (loginState.roleDetails[0].tagline || "")
                      : ""
                  }
                  about={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0
                      ? (loginState.roleDetails[0].about || loginState.roleDetails[0].description || "")
                      : ""
                  }
                />
              ),
            },
            {
              path: "/HostDashBoard/:hostId",
              element: (
                <MainPage
                  ParticipantId={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0 &&
                    loginState.roleDetails[0].id
                      ? loginState.roleDetails[0].id
                      : "1"
                  }
                  role="host"
                  pageName="HostMainPage"
                  buttonMembers={["OPEN", "CLOSED", "UPCOMING"]}
                  currentMember="OPEN"
                />
              ),
            },
            {
              path: "/HostApplicationsDashBoard/:hostId",
              element: (
                <MainPage
                  ParticipantId={
                    loginState &&
                    loginState.roleDetails &&
                    loginState.roleDetails.length > 0 &&
                    loginState.roleDetails[0].id
                      ? loginState.roleDetails[0].id
                      : "1"
                  }
                  role="host"
                  pageName="HostApplicationsPage"
                  buttonMembers={["PENDING", "ACCEPTED"]}
                  currentMember="PENDING"
                />
              ),
            },
          ],
        },
            //     />
            //   ),
            // },
          ],
        },
      ],
    },
  ]);
}

export default Router;
