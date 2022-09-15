import React from 'react';
import './Prediction.css'
import Chart from './Chart';

function prediction(props){

    let certainty

    if(props.percArr && props.index){
        certainty = parseFloat(props.percArr[props.index].toFixed(4));
    }


    return(
            <div id='predContainer'>
                <div id='predTitle'>Your Prediction:</div>
                <div id='pred'>
                    <div id='predbox'>
                        <div id='predtext'>{props.index}</div>
                        <div id='certainty'>certainty: {certainty}%</div>
                    </div>
                </div>
                <Chart className='recharts-wrapper' percArr={props.percArr}/>
            </div>
        )

    }
        
    

export default prediction