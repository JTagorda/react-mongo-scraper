import React from "react";

export const ScrapeBtn = props => (
    <button className={`${props.bootstrap}`} {...props}>
        {props.children}
    </button>
);