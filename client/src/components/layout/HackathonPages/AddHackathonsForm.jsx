import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import { addHackathon } from "../../redux/actions/HackathonActions";
import { useNavigate } from "react-router-dom";
import MultiSelectDropdown from "./MultiSelectDropDown";
import { AddHackathonFormSchema } from "../../common/Schemas/Schemas";
import {
  generalThunkFunction,
  workSuccess,
} from "../../../redux/actions/Genralactions";
function AddHackathonForm({ ApplyNow }) {
  const generalState = useSelector((state) => state.generalReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    dispatch(generalThunkFunction("getAllHackathons"));
  }, []);

  useEffect(() => {
    setHackathons(generalState.hackathons);
  }, [generalState]);

  const initialValues = {
    name: "",
    status: "",
    tagline: "",
    description: "",
    prizes: "",
    registrationStart: "",
    registrationEnd: "",
    hackathonStart: "",
    hackathonEnd: "",
    teamMin: "",
    teamMax: "",
    techstacks: "",
    mode: "",
    location: "",
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-lg shadow-md shadow-blue-500  w-fit overflow-hidden max-w-[1000px]">
        <div className="md:flex w-full ">
          <div className="w-full md:w-fit mx-auto py-10 px-5 md:px-10 ">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                Add New Hackathon
              </h1>
              <p>Enter the details of the new hackathon</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={AddHackathonFormSchema}
              onSubmit={(values, action) => {
                console.log("submit worked");
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
                  id: hackathons.length > 0 ? (parseInt(hackathons[hackathons.length - 1].id) + 1) : 1,
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
                  generalThunkFunction("AddNewHackathon", hackathonsDetails)
                ).then((success) => {
                  if (success) {
                    setSelectedTechnologies([]);
                    setSelectedPerks([]);
                    action.resetForm();
                    navigate("/hackathons");
                  } else {
                    alert("Failed to create hackathon. Please check your inputs and try again.");
                  }
                });
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
                          Hackathon Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full  text-center py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500"
                          placeholder="ETH India"
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
                          placeholder="Biggest Ethereum Hackathon "
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
                          placeholder="Biggest Ethereum Hackathon "
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
                            placeholder="number"
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
                            placeholder="number"
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
                            placeholder="eg. Mumbai"
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
                              placeholder=""
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
                              placeholder="johnsmith@example.com"
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
                              placeholder="johnsmith@example.com"
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
                              placeholder="johnsmith@example.com"
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
                                  {
                                    /* Change setSelectedOptions to setSelectedPerks */
                                  }
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
                          placeholder="eg. 500000"
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
                          onClick={() => console.log("submit button clicked")}
                          type="submit"
                          className="block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                        >
                          SUBMIT
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

export default AddHackathonForm;
