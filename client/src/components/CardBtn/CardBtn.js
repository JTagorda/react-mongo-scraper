import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    onClick={props.onClick}
    className={`btn btn-sm btn-primary ${props["data-value"]}`}
    {...props}
  >
  {props.content}
  </button>
);

export default CardBtn;
