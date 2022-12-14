import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./AlertMessage.css";

const AlertMessage = ({ text }) => {
  return (
    <div className="audun_success">
      <CheckCircleIcon />
      {text}
    </div>
  );
};

export default AlertMessage;
