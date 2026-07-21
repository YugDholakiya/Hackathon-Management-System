import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectDropdown from "./MultiSelectDropDown";
import { AddHackathonFormSchema } from "../../common/Schemas/Schemas";
import {
  generalThunkFunction,
} from "../../../redux/actions/Genralactions";

function EditHackathonForm() {
  const generalState = useSelector((state) => state.generalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const loginState = useSelector((state) => state.registerLoginReducer);

  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [hackathonDetails, setHackathonDetails] = useState(null);

  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathons"));
  }, []);

  useEffect(() => {
    if (generalState.hackathons && generalState.hackathons.length > 0) {
      const hackathon = generalState.hackathons.find(
        (h) => String(h.id) === String(hackathonId)
      );
      if (hackathon) {
        setHackathonDetails(hackathon);
        setSelectedTechnologies(hackathon.techstacks || []);
        setSelectedPerks(hackathon.prizes?.perks || []);
      }
    }
  }, [generalState, hackathonId]);

  if (!hackathonDetails) {
    return <div className="text-center mt-10">Loading hackathon details...</div>;
  }

  const initialValues = {
    name: hackathonDetails.name || "",
    status: hackathonDetails.hackathonStatus || "",
    tagline: hackathonDetails.tagline || "",
    description: hackathonDetails.description || "",
    prizes: hackathonDetails.prizes?.prizePool || "",
    registrationStart: hackathonDetails.dates?.registrationStart?.split('T')[0] || "",
    registrationEnd: hackathonDetails.dates?.registrationEnd?.split('T')[0] || "",
    hackathonStart: hackathonDetails.dates?.hackathonStart?.split('T')[0] || "",
    hackathonEnd: hackathonDetails.dates?.hackathonEnd?.split('T')[0] || "",
    teamMin: hackathonDetails.teamSize?.min || "",
    teamMax: hackathonDetails.teamSize?.max || "",
    techstacks: "",
    mode: hackathonDetails.mode ? hackathonDetails.mode.charAt(0).toUpperCase() + hackathonDetails.mode.slice(1).toLowerCase() : "",
    location: hackathonDetails.location || "",
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-lg shadow-md shadow-blue-500  w-fit overflow-hidden max-w-[1000px]">
        <div className="md:flex w-full ">
          <div className="w-full md:w-fit mx-auto py-10 px-5 md:px-10 ">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                Edit Hackathon
              </h1>
              <p>Update the details of your hackathon</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={AddHackathonFormSchema}
              enableReinitialize={true}
              onSubmit={(values, action) => {
                const currentDate = new Date();
                const selectedDate = new Date(values.registrationStart);
                const status = () => {
                  if (selectedDate > currentDate) {
                    return "Upcoming";
                  } else {
                    return "Open";
                  }
                };

                const hackathonsDetails = {
                  id: hackathonId,
                  name: values.name,
                  status: status(),
                  tagline: values.tagline,
                  description: values.description,
                  prizes: values.prizes,
                  registrationStart: values.registrationStart,
                  registrationEnd: values.registrationEnd,
                  hackathonStart: values.hackathonStart,
                  hackathonEnd: values.hackathonEnd,
                  teamMin: values.teamMin,
                  teamMax: values.teamMax,
                  techstacks: selectedTechnologies.length > 0 ? selectedTechnologies : ["General"],
                  mode: values.mode,
                  location: values.location,
                  perks: selectedPerks.length > 0 ? selectedPerks : ["None"],
                };

                dispatch(
                  generalThunkFunction("UpdateHackathon", hackathonsDetails)
                ).then((success) => {
                  if (success) {
                    const hostId = loginState?.roleDetails?.[0]?.id || "";
                    navigate(`/HostDashBoard/${hostId}`);
                  } else {
                    alert("Failed to update hackathon. Please check your inputs and try again.");
                  }
                });
              }}
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
                          Hackathon Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
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
                          Tagline
                        </label>
                        <Field
                          type="text"
                          id="tagline"
                          name="tagline"
                          className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="tagline"
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
                          Description
                        </label>
                        <Field
                          type="text"
                          id="description"
                          name="description"
                          className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    {/* max min team sixe hackathon mode venu */}
                    <div className="flex flex-col lg:flex-row gap-1">
                      {/* Min team size input */}
                      <div className="flex -mx-3 ">
                        <div className="w-full px-3 mb-5">
                          <label
                            htmlFor="teamMin"
                            className="text-xs font-semibold px-1"
                          >
                            Minimum Team Members
                          </label>
                          <Field
                            type="number"
                            id="teamMin"
                            name="teamMin"
                            className="w-full  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name="teamMin"
                            component="div"
                            className="text-xs text-red-500"
                          />
                        </div>
                      </div>
                      {/*  Max team size input */}
                      <div className="flex -mx-3 ">
                        <div className="w-full px-3 mb-5">
                          <label
                            htmlFor="teamMax"
                            className="text-xs font-semibold px-1"
                          >
                            Maximum Team Members
                          </label>
                          <Field
                            type="number"
                            id="teamMax"
                            name="teamMax"
                            className="w-full  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name="teamMax"
                            component="div"
                            className="text-xs text-red-500"
                          />
                        </div>
                      </div>
                      {/* mode select input */}
                      <div className="flex -mx-3 ">
                        <div className="w-full  px-3 mb-5">
                          <label
                            htmlFor="mode"
                            className="text-xs font-semibold px-1"
                          >
                            Hackathon Mode
                          </label>
                          <Field
                            as="select"
                            id="mode"
                            name="mode"
                            className="w-full text-center  py-[10px] rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          >
                            <option value="" disabled defaultValue>
                              Select Mode
                            </option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </Field>
                          <ErrorMessage
                            name="mode"
                            component="div"
                            className="text-xs text-red-500"
                          />
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex -mx-3 ">
                        <div className="w-full px-3 mb-5">
                          <label
                            htmlFor="location"
                            className="text-xs font-semibold px-1"
                          >
                            Venue
                          </label>
                          <Field
                            type="text"
                            id="location"
                            name="location"
                            className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="text-xs text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-1 ">
                        {/* Registration Start */}
                        <div className="flex flex-col -mx-3  ">
                          <div className="w-full px-3 mb-5">
                            <label
                              htmlFor="registrationStart"
                              className="text-xs font-semibold px-1"
                            >
                              Registration Start
                            </label>
                            <Field
                              type="date"
                              id="registrationStart"
                              name="registrationStart"
                              className="w-fit  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name="registrationStart"
                              component="div"
                              className="text-xs text-red-500"
                            />
                          </div>
                        </div>
                        {/*  Max team size input */}
                        <div className=" -mx-3 ">
                          <div className="w-full px-3 mb-5">
                            <label
                              htmlFor="registrationEnd"
                              className="text-xs font-semibold px-1"
                            >
                              Registration End
                            </label>
                            <Field
                              type="date"
                              id="registrationEnd"
                              name="registrationEnd"
                              className="w-fit  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name="registrationEnd"
                              component="div"
                              className="text-xs text-red-500"
                            />
                          </div>
                        </div>

                        {/*  Max team size input */}
                        <div className="  flex flex-col -mx-3  ">
                          <div className="w-full px-3 mb-5 ">
                            <label
                              htmlFor="hackathonStart"
                              className="text-xs font-semibold px-1"
                            >
                              Hackathon Start
                            </label>
                            <Field
                              type="date"
                              id="hackathonStart"
                              name="hackathonStart"
                              className="w-fit  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name="hackathonStart"
                              component="div"
                              className="text-xs text-red-500"
                            />
                          </div>
                        </div>

                        {/*  Max team size input */}
                        <div className="flex -mx-3 ">
                          <div className="w-full px-3 mb-5 ">
                            <label
                              htmlFor="hackathonEnd"
                              className="text-xs font-semibold px-1"
                            >
                              Hackathon End
                            </label>
                            <Field
                              type="date"
                              id="hackathonEnd"
                              name="hackathonEnd"
                              className="w-fit  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name="hackathonEnd"
                              component="div"
                              className="text-xs text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                      {/*multi select section */}
                      <div className="flex justify-between">
                        <div className="flex -mx-3  ">
                          <div className="w-full px-3 mb-5 border-2 border-gray-300 rounded-md py-2 ml-3">
                            <MultiSelectDropdown
                              labelDropdown="Select Technologies"
                              labelStack="Tech Stack"
                              options={[
                                "No Restrictions",
                                "BlockChain",
                                "ReactJs",
                                "NodeJS",
                                "AI/ML",
                                "Deep Learning",
                              ]}
                              selectedOptions={selectedTechnologies}
                              onSelect={(option) => {
                                setSelectedTechnologies(
                                  (prevSelectedOptions) => {
                                    if (prevSelectedOptions.includes(option)) {
                                      return prevSelectedOptions.filter(
                                        (selectedOption) =>
                                          selectedOption !== option
                                      );
                                    } else {
                                      return [...prevSelectedOptions, option];
                                    }
                                  }
                                );
                              }}
                            />
                            <ErrorMessage
                              name="techStacks"
                              component="div"
                              className="text-xs text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex -mx-3   ">
                          <div className="w-full px-3 mb-5 border-2 border-gray-300 rounded-md  py-2 mr-3">
                            <MultiSelectDropdown
                              labelDropdown="Other Perks"
                              labelStack="Perks"
                              options={[
                                "No OtherPerks",
                                "Accommodation",
                                "Meals",
                                "Swags",
                                "Goodies",
                                "Internship Opportunities",
                                "Grants",
                              ]}
                              selectedOptions={selectedPerks}
                              onSelect={(option) => {
                                setSelectedPerks((prevSelectedOptions) => {
                                  if (prevSelectedOptions.includes(option)) {
                                    return prevSelectedOptions.filter(
                                      (selectedOption) =>
                                        selectedOption !== option
                                    );
                                  } else {
                                    return [...prevSelectedOptions, option];
                                  }
                                });
                              }}
                            />
                            <ErrorMessage
                              name="perks"
                              component="div"
                              className="text-xs text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  Max team size input */}
                    <div className="flex -mx-3 ">
                      <div className="w-full px-3 mb-5">
                        <label
                          htmlFor="prizes"
                          className="text-xs font-semibold px-1"
                        >
                          Prize Pool
                        </label>
                        <Field
                          type="number"
                          id="prizes"
                          name="prizes"
                          className="w-full  text-center  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="prizes"
                          component="div"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex -mx-3">
                      <div className="w-full  px-3 mb-0">
                        <button
                          type="submit"
                          className="block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                        >
                          SAVE CHANGES
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

export default EditHackathonForm;
