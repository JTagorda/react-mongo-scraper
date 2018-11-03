import React from "react";

export const ScrapeBtn = props => (
    <button className={`${props.classProps}`} {...props}>
        {props.children}
    </button>
);