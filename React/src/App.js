
import './App.css';
import Canvas from './Components/Canvas'
import Container from './Components/container';
import ModelthreeD from './Components/3d';
import React, { useState } from 'react';
import * as TSP from 'tensorspace';
import $ from 'jquery';


function App() {

  const [drawnNumber, setDrawnNumber] = useState()
  const [prediction, setPrediction] = useState()

  
  let container = document.getElementById("container");
  let model = new TSP.models.Sequential(container);

    
    
  model.add(new TSP.layers.GreyscaleInput({ shape: [28, 28] }));
  model.add(new TSP.layers.Padding2d());
  model.add(new TSP.layers.Conv2d());
  model.add(new TSP.layers.Pooling2d());
  model.add(new TSP.layers.Conv2d());
  model.add(new TSP.layers.Pooling2d());
  model.add(new TSP.layers.Dense());
  model.add(new TSP.layers.Dense());
  model.add(new TSP.layers.Output1d({
      outputs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  }));

  
  
  

  model.load({
      type: "tfjs",
      url: './tensorspace/model.json'
  });

  model.init(function () {
    $('#container').children().not(':last').remove();
    let oneDArray = [].concat(...prediction.imgArray[0]);
    model.predict(oneDArray);
    console.log('cleared');
    
})   



  return (
    <div className="App">
      <Canvas id='canvas' drawnNumber={drawnNumber} setDrawnNumber={setDrawnNumber} prediction={prediction} setPrediction={setPrediction} />
    
    </div>
  );
}

export default App;
