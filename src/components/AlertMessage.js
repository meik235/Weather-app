import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
