import React, { useState } from "react";
import AppointmentsItem from "./AppointmentsItem";
import { format } from "date-fns";

const Appointments = () => {
  const [appointments, setAppointments] = useState({
    title: "",
    titleErr: false,
    date: "",
    dateErr: false,
    appointmentsList: [],
    isFilterActive: false,
  });
  const [appointmentId, setAppointmentId] = useState(0);

  const toggleIsStarred = (id) => {
    setAppointments((prevState) => ({
      ...appointments,
      appointmentsList: prevState.appointmentsList.map((eachAppointment) => {
        if (id === eachAppointment.id) {
          return { ...eachAppointment, isStarred: !eachAppointment.isStarred };
        }
        return eachAppointment;
      }),
    }));
  };

  const onFilter = () => {
    setAppointments({
      ...appointments,
      isFilterActive: !appointments.isFilterActive,
    });
  };

  const handleDate = (e) => {
    setAppointments({ ...appointments, date: e.target.value });
  };

  const handleTitle = (e) => {
    setAppointments({ ...appointments, title: e.target.value });
  };

  const onAddAppointment = () => {
    const formattedDate = appointments.date
      ? format(new Date(appointments.date), "dd mmmm yyyy, EEEE")
      : "";

    const newAppointment = {
      id: appointmentId,
      title: appointments.title,
      date: formattedDate,
      isStarred: false,
    };

    setAppointments((prevState) => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: "",
      date: "",
    }));

    setAppointmentId((prev) => prev + 1);
  };

  const getFilteredAppointmentsList = () => {
    if (appointments.isFilterActive) {
      return appointments.appointmentsList.filter(
        (eachItem) => eachItem.isStarred === true
      );
    }
    return appointments.appointmentsList;
  };

  const filteredAppointmentsList = getFilteredAppointmentsList();

  const onTitleBlur = (e) => {
    if (appointments.title === "") {
      setAppointments({ ...appointments, titleErr: true });
    } else {
      setAppointments({ ...appointments, titleErr: false });
    }
  };

  const onDateBlur = (e) => {
    if (appointments.date === "") {
      setAppointments({ ...appointments, dateErr: true });
    } else {
      setAppointments({ ...appointments, dateErr: false });
    }
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gradient-to-b from-[#fbc7d4] to-[#9796f0]">
      <div className="flex flex-col bg-[#ffffff] py-10 px-20 rounded-xl w-[80%]">
        <div className="flex justify-between items-center gap-10 py-5">
          <div className="md:w-[50%] w-full">
            <h1 className="text-[#171f46] font-semibold text-2xl my-3">
              Add Appointment
            </h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col my-3">
                <label
                  htmlFor="title"
                  className="text-[#b5b7c4] font-semibold my-1"
                >
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={appointments.title}
                  onChange={handleTitle}
                  className="border-[1px] border-[#171f46] px-2 py-1 rounded-md outline-none"
                  placeholder="Title"
                  onBlur={onTitleBlur}
                />
                {appointments.titleErr && (
                  <p className="text-red-500 font-semibold mt-1">
                    Enter a Valid Title
                  </p>
                )}
              </div>
              <div className="flex flex-col my-3">
                <label
                  htmlFor="date"
                  className="text-[#b5b7c4] font-semibold my-1"
                >
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={appointments.date}
                  onChange={handleDate}
                  className="border-[1px] border-[#171f46] px-2 py-1 rounded-md outline-none"
                  onBlur={onDateBlur}
                />
                {appointments.dateErr && (
                  <p className="text-red-500 font-semibold mt-1">
                    Choose a Valid Date
                  </p>
                )}
              </div>
              <div>
                <button
                  onClick={onAddAppointment}
                  className="bg-[#8b5cf6] text-[#ffffff] py-2 px-5 rounded-md font-semibold my-3"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="flex">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="md:h-[200px] md:w-[100%] hidden md:block"
            />
          </div>
        </div>
        <hr className="border-[#171f46] border-b" />
        <div className="flex flex-col my-3">
          <div className="sm:flex sm:justify-between items-baseline my-3">
            <h1 className="text-[#171f46] font-semibold text-2xl my-3">
              Appoinmtmemts
            </h1>

            <button
              onClick={onFilter}
              className="border-[2px] border-[#8b5cf6] text-[#8b5cf6] py-1 px-7 rounded-3xl font-semibold text-xl"
            >
              Starred
            </button>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-5">
            {filteredAppointmentsList.map((eachAppointment) => {
              return (
                <AppointmentsItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={toggleIsStarred}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
