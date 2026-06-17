import React, { useState, useEffect } from "react";
import Animation from "../Animation/Animation";
import MaleAnimation from "../../../utils/Profile Page/Male Avatar.json";
import FemaleAnimation from "../../../utils/Profile Page/Female Avatar.json";
import HostAnimation from "../../../utils/Profile Page/HostAnimation.json";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setRole } from "../../../redux/actions/RegisterLoginActions";
import { updateUserProfile } from "../../../utils/axiosInstance/axiosInstance";

function MainProfilePage({ name, tagline, designation, about, role, gender, email, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.registerLoginReducer);

  const [isEditing, setIsEditing] = useState(false);
  const [tempTagline, setTempTagline] = useState(tagline || "");
  const [tempDesignation, setTempDesignation] = useState(designation || "");
  const [tempAbout, setTempAbout] = useState(about || "");

  useEffect(() => {
    setTempTagline(tagline || "");
    setTempDesignation(designation || "");
    setTempAbout(about || "");
  }, [tagline, designation, about]);

  const handleSave = async () => {
    try {
      const payload = {
        tagline: tempTagline,
        designation: tempDesignation,
        about: tempAbout,
      };
      
      const res = await updateUserProfile(payload);
      if (res && res.success) {
        const updatedUser = {
          ...(loginState.roleDetails && loginState.roleDetails.length > 0 ? loginState.roleDetails[0] : {}),
          tagline: tempTagline,
          designation: tempDesignation,
          about: tempAbout,
          description: tempAbout,
        };
        dispatch(setRole([updatedUser], loginState.role, true));
        setIsEditing(false);
      } else {
        alert(res.error || "Failed to update profile");
      }
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 pt-10 pb-20  mx-auto ">
          <div className="lg:w-4/5 mx-auto flex flex-col  shadow-lg shadow-blue-500 rounded-md p-10">
            <Animation
              path={
                gender === "male"
                  ? MaleAnimation
                  : gender === "female"
                  ? FemaleAnimation
                  : HostAnimation
              }
              width="50%"
              height="100%"
            />
            <div className="lg:w-auto w-full lg:px-10 lg:py-6 mt-6 lg:mt-1 lg:mx-auto text-center    ">
              <div className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-2 border-b-2 border-green-500 w-fit mx-auto ">
                {name}
              </div>

              {isEditing ? (
                <div className="w-full max-w-md mx-auto my-4 text-left">
                  {role.toLowerCase() === "host" ? (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Tagline</label>
                      <input
                        type="text"
                        value={tempTagline}
                        onChange={(e) => setTempTagline(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your tagline"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                      <input
                        type="text"
                        value={tempDesignation}
                        onChange={(e) => setTempDesignation(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your designation"
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">About</label>
                    <textarea
                      value={tempAbout}
                      onChange={(e) => setTempAbout(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
                      placeholder="Write something about yourself..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                    {role.toLowerCase() === "host"
                      ? `Tagline : ${tagline || "Not Defined"}`
                      : `Designation : ${designation || "Not Defined"}`}
                  </h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                    {role.toLowerCase() === "host" || role.toLowerCase() === "participant"
                      ? `Email : ${email}`
                      : null}
                  </h2>
                  {role.toLowerCase() === "participant" ? (
                    <>
                      <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">
                        Gender : {gender}
                      </h2>
                    </>
                  ) : null}

                  <p className="leading-relaxed my-4 text-gray-700">About : {about || "No Details Provided"}</p>
                </>
              )}

              <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      variant="primary"
                      buttonStyle="m-0 bg-blue-500 font-bold py-3 px-8 text-white hover:bg-blue-600 shadow-md transition duration-200"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => {
                        setTempTagline(tagline || "");
                        setTempDesignation(designation || "");
                        setTempAbout(about || "");
                        setIsEditing(false);
                      }}
                      variant="danger"
                      buttonStyle="m-0 bg-red-500 font-bold py-3 px-8 text-white hover:bg-red-600 shadow-md transition duration-200"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="primary"
                      buttonStyle="m-0 bg-blue-500 font-bold py-3 px-8 text-white hover:bg-blue-600 shadow-md transition duration-200"
                    >
                      Edit Profile
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(setLogout());
                        navigate("/");
                      }}
                      variant="danger"
                      buttonStyle="m-0 bg-red-500 font-bold py-3 px-8 text-white hover:bg-red-600 shadow-md transition duration-200"
                    >
                      Log Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainProfilePage;
