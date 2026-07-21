import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import { useDispatch, useSelector } from "react-redux";
// import { addHackathon } from "../../redux/actions/HackathonActions";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectDropdown from "./MultiSelectDropDown";
import { ApplyNowSchema } from "../../common/Schemas/Schemas";
import {
  generalThunkFunction,
  workSuccess,
} from "../../../redux/actions/Genralactions";

function ApplyNow({}) {
  const generalState = useSelector((state) => state.generalReducer);
  const loginState = useSelector((state) => state.registerLoginReducer);
  console.log(loginState)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [teamSize, setTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState([]);
  const [hackathonsApplications, setHackathonsApplications] = useState([]);
  const [hackathonDetails, setHackathonDetails] = useState([]);
const [LeaderId,setLeaderId] = useState("");
  const { hackathonId, hackathonName } = useParams();
  console.log(hackathonId);
  console.log(hackathonName);
  let minTeam = 1,
    maxTeam = 5;

  

  useEffect(() => {
    if (hackathonDetails && hackathonDetails.teamSize) {
      // const HackthonId = parseInt(hackathonDetails.id);
      const minTeam = parseInt(hackathonDetails.teamSize.min);
      const maxTeam = parseInt(hackathonDetails.teamSize.max);
      // if(minTeam === 1)
      // setTeamSize(2);
      setTeamSize(minTeam);
      console.log(typeof minTeam);

      let teamMembersArray;
      if (minTeam === 1) {
        teamMembersArray = Array.from(
          { length: maxTeam - minTeam + 1 },
          (_, i) => minTeam + 1 + i
        );
      } else {
        teamMembersArray = Array.from(
          { length: maxTeam - minTeam + 1 },
          (_, i) => minTeam + i
        );
      }
      setTeamMembers(teamMembersArray);
    }
  }, [hackathonDetails]);

  // Ensure the useEffect dependency array includes hackathonDetails to avoid infinite loops

  console.log(teamMembers);
  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathonsApplications"));
    dispatch(generalThunkFunction("getAllHackathons"));
  }, []);

  useEffect(() => {
    setHackathonsApplications(generalState.hackathonApplications);
    const hackathon = generalState.hackathons.find(
      (hackathon) => hackathon.id === hackathonId
    );
    console.log(hackathon);
    setHackathonDetails(hackathon);

    setLeaderId(loginState.roleDetails[0].id)


  }, [generalState,loginState]);

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    teamMembers: "number",
    teamDetails: [],
    problemStatementAbstract: "",
    technologyUsed: [],
  };

  return (
    <div className="w-full  min-h-screen bg-white flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-lg shadow-md shadow-blue-500  w-fit overflow-hidden max-w-[1000px]">
        <div className="md:flex w-full ">
          <div className="w-full md:w-fit mx-auto py-10 px-5 md:px-10 ">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                {hackathonDetails ? hackathonDetails.name : "APPLY NOW"}
              </h1>
              <p>Enter the details to Apply in Hackathon</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={ApplyNowSchema}
              onSubmit={async (values, action) => {
                console.log("submit worked");
                console.log(values.teamDetails);
                const ApplicationDetails = {
                  hackathonId: hackathonDetails.id,
                  hackathonName: hackathonDetails.name,
                  leaderId: LeaderId,
                  name: values.name,
                  email: values.email,
                  gender: values.gender,
                  teamMembers: teamSize,
                  teamDetails: values.teamDetails,
                  problemStatementAbstract: values.problemStatementAbstract,
                  technologyUsed: selectedTechnologies,
                };

                const success = await dispatch(
                  generalThunkFunction(
                    "addHackathonApplication",
                    ApplicationDetails
                  )
                );

                if (success) {
                  alert("Application submitted successfully!");
                  dispatch(generalThunkFunction("getAllHackathonApplications"));
                  action.resetForm();
                  navigate(`/ParticipantDashBoard/${LeaderId}`);
                } else {
                  alert("Failed to submit application. You might have already applied.");
                }
              }}

              // dispatch(addHackathon(values));
            >
              {(formik) => (
                <div className="">
                  <Form>
                    {/*hackathon Name input */}

                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor="name"
                          className="text-xs font-semibold px-1"
                        >
                          Leader Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          placeholder="Vatsal Bhatti"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    {/* Tagline input */}
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor="tagline"
                          className="text-xs font-semibold px-1"
                        >
                          Email
                        </label>
                        <Field
                          type="text"
                          id="email"
                          name="email"
                          className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          placeholder="abc@gmail.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>
                    {/* Description input */}
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor="description"
                          className="text-xs font-semibold px-1"
                        >
                          Gender
                        </label>
                        <Field
                          as="select"
                          id="gender"
                          name="gender"
                          className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                        >
                          <option value="" disabled defaultValue>
                            Select Gender
                          </option>

                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    {/* max min team sixe hackathon mode venu */}

                    {/* Min team size input */}
                    <div className="flex -mx-3 ">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor="teamMin"
                          className="text-xs font-semibold px-1"
                        >
                          Team Members (Min {hackathonDetails?.teamSize?.min || 1} - Max {hackathonDetails?.teamSize?.max || 4})
                        </label>
                        <Field
                          type="number"
                          id="teamMin"
                          name="teamMin"
                          value={teamSize}
                          onChange={(e) => {
                            let val = parseInt(e.target.value);
                            const max = hackathonDetails?.teamSize?.max ? parseInt(hackathonDetails.teamSize.max) : 4;
                            const min = hackathonDetails?.teamSize?.min ? parseInt(hackathonDetails.teamSize.min) : 1;
                            if (isNaN(val)) {
                              val = "";
                            }
                            setTeamSize(val);
                          }}
                          onBlur={(e) => {
                            let val = parseInt(e.target.value);
                            const max = hackathonDetails?.teamSize?.max ? parseInt(hackathonDetails.teamSize.max) : 4;
                            const min = hackathonDetails?.teamSize?.min ? parseInt(hackathonDetails.teamSize.min) : 1;
                            if (isNaN(val) || val < min) {
                              setTeamSize(min);
                            } else if (val > max) {
                              setTeamSize(max);
                            }
                          }}
                          min={hackathonDetails?.teamSize?.min || 1}
                          max={hackathonDetails?.teamSize?.max || 4}
                          className="w-full text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          placeholder="Number of team members"
                        />
                        {/* <ErrorMessage
                          name="teamMin"
                          component="div"
                          className="text-xs text-red-500"
                        /> */}
                      </div>
                    </div>

                    {teamSize === 1 ? (
                      <>
                        <div className=" w-[307.2px] md:w-[644.8px] lg:w-[745.55px] text-center">
                          Only One Team Member
                        </div>
                      </>
                    ) : (
                      <div className="w-full ">
                        <FieldArray name="teamDetails">
                          {({ insert, remove, push }) => (
                            <div>
                              {Array.from({ length: teamSize - 1 }).map(
                                (_, i) => (
                                  <div
                                    className="flex flex-col md:flex-row"
                                    key={i}
                                  >
                                    <div className="w-full px-3 mb-5 ">
                                      <label
                                        htmlFor={`teamDetails.${i}.name`}
                                        className="text-xs font-semibold px-1"
                                      >
                                        Name {i + 1}
                                      </label>
                                      <Field
                                        name={`teamDetails.${i}.name`}
                                        placeholder="Name"
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`teamDetails.${i}.name`}
                                        component="div"
                                        className="text-xs text-red-500"
                                      />
                                    </div>
                                    <div className="w-full px-3 mb-5">
                                      <label
                                        htmlFor={`teamDetails.${i}.email`}
                                        className="text-xs font-semibold px-1"
                                      >
                                        Email {i + 1}
                                      </label>
                                      <Field
                                        name={`teamDetails.${i}.email`}
                                        placeholder="Email"
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`teamDetails.${i}.email`}
                                        component="div"
                                        className="text-xs text-red-500"
                                      />
                                    </div>
                                    <div className="w-full px-3 mb-5 ">
                                      <label
                                        htmlFor={`teamDetails.${i}.gender`}
                                        className="text-xs font-semibold px-1"
                                      >
                                        Gender {i + 1}
                                      </label>
                                      <Field
                                        as="select"
                                        name={`teamDetails.${i}.gender`}
                                        className="w-[185px] md:w-full py-[2px]"
                                      >
                                        <option value="" disabled defaultValue>
                                          Select Gender
                                        </option>
                                        <option value="  Select Gender">
                                          {" "}
                                          Select Gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`teamDetails.${i}.gender`}
                                        component="div"
                                        className="text-xs text-red-500"
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    )}

                    {/*  Max team size input */}
                    <div className="flex -mx-3 ">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor="teamMax"
                          className="text-xs font-semibold px-1"
                        >
                          Problem Statement Abstract
                        </label>
                        <Field
                          type="text"
                          id="problemStatementAbstract"
                          name="problemStatementAbstract"
                          className="w-full  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          placeholder="Problem Statement Abstract"
                        />
                        <ErrorMessage
                          name="problemStatementAbstract"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    {/*dates section */}

                    <div className="flex -mx-3 ">
                      <div className="w-full px-3 mb-5">
                        <MultiSelectDropdown
                          labelDropdown="Select Technologies"
                          labelStack="Tech Stack"
                          ifFull={true}
                          options={
                            hackathonDetails
                              ? hackathonDetails.techstacks
                              : [
                                  "No Restrictions",
                                  "BlockChain",
                                  "ReactJs",
                                  "NodeJS",
                                  "AI/ML",
                                  "Deep Learning",
                                ]
                          }
                          selectedOptions={selectedTechnologies}
                          onSelect={(option) => {
                            setSelectedTechnologies((prevSelectedOptions) => {
                              if (prevSelectedOptions.includes(option)) {
                                return prevSelectedOptions.filter(
                                  (selectedOption) => selectedOption !== option
                                );
                              } else {
                                return [...prevSelectedOptions, option];
                              }
                            });
                          }}
                        />
                        <ErrorMessage
                          name="techStacks"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex -mx-3">
                      <div className="w-full  px-3 mb-0">
                        <button
                          onClick={() => console.log("submit button clicked")}
                          type="submit"
                          className="block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                        >
                          SUBMIT APPLICATION
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyNow;
