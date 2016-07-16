import React from "react";
import {render} from "react-dom";
import {Feed} from "../components/Feed";

require("./main.less");

render(
    <Feed/>,
    document.getElementById("container")
);