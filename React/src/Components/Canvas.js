import CanvasDraw from "react-canvas-draw";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './Canvas.css'
import Prediction from "./Prediction";
import Chart from "./Chart";
import * as TSP from 'tensorspace';
import prediction from "./Prediction";
import $ from 'jquery';






const Canvas = (props) => {

    const canvas = useRef(null)
    let img;

    function SubmitImage() {
        img = canvas.current.getDataURL('png')
        props.setDrawnNumber(img)
    }



    


    useEffect(() => {
        if (props.drawnNumber) {
            axios.post('/imageUrl', { url: props.drawnNumber }, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                props.setPrediction(response.data)
            })
        }
    }, [props.drawnNumber])


    const eraseState = () => {
        props.setDrawnNumber(null)
        props.setPrediction(null)
    }


    ///formats prediction
    let temparr
    let percArr
    let index


    if (props.prediction) {
        temparr = props.prediction.pred
        percArr = temparr.map(num => num * 100.0)
        index = temparr.indexOf(Math.max(...temparr))
    }

    return (
        <div id='interaction-section'>
            <div id='draw-section'>
                <div id='canvasTitle'>Draw Here:</div>
                <div id='canvas-container'>
                    <div id='canvas'>
                        <CanvasDraw
                            id='can'
                            ref={canvas}
                            lazyRadius={0}
                            canvasWidth={250}
                            canvasHeight={250}
                            brushColor={'black'}
                            gridColor={'rgba(150,150,150,0.4)'}
                            brushRadius={11}
                        />
                    </div>
                </div>
                <div id='button-container'>
                    <button
                        id='erase'
                        onClick={() => {
                            eraseState()
                            canvas.current.eraseAll();
                        }}
                    >
                        Erase
                    </button>

                    <button
                        id='submit'
                        onClick={() => {
                            SubmitImage()
                            
                        }}
                    >
                        Predict
                    </button>

                </div>

            </div>
            <div id='prediction-section'>
                <Prediction id='prediction-container' index={index} percArr={percArr} prediction={props.prediction} />
            </div>






        </div>
    )

}

export default Canvas
