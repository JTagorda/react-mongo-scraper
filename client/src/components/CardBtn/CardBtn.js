import React from "react";
import "./CardBtn.css";
import { Link } from "react-router-dom";

const CardBtn = props => (
  <Link to={`/articles/${props.id}`}>
    <button
      className={`btn btn-sm btn-primary mt-1 ${props["data-value"]}`}
      {...props}
    >
    {props.content}
    </button>
  </Link>
);

export default CardBtn;
