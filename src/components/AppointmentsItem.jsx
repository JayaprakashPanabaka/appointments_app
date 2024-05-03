import React from "react";

const AppointmentsItem = ({ appointmentDetails, toggleIsStarred }) => {
  const { id, title, date, isStarred } = appointmentDetails;

  const starImgUrl = isStarred
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";

  const onClickStar = () => {
    toggleIsStarred(id);
  };

  return (
    <div className="flex justify-between border-[1px] border-[#171f46] rounded-md p-2 my-3">
      <div>
        <h3 className="text-[#171f46] text-xl font-semibold">{title}</h3>
        <p className="text-[#b5b7c4] font-semibold">Date: {date}</p>
      </div>
      <div>
        <button onClick={onClickStar}>
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
    </div>
  );
};

export default AppointmentsItem;
