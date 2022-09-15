import React from "react";
import './container.css'
import ModelthreeD from "./3d";

const Container = (props) => {
    return (
        <div id='container'>
            <ModelthreeD prediction={props.prediction} />
        </div>
    )
}

export default Container