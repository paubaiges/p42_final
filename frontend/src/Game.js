import React, { Component, useEffect, useRef, useState } from "react";
import './App.css';
import { ReactMediaRecorder } from "react-media-recorder";
import img1 from './png/2.1.png';
import Metronome from '@kevinorriss/react-metronome';
import { ReactDOM } from "react";


class Game extends React.Component{

    constructor(){
      super();
      this.state = {
        volume:1,
        score:0,
        metronome_pressed:false,
        txt:'Take the test'
      }
    }

    render () {return(
        <div>
        <ReactMediaRecorder
          audio
          render={({status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <h1>Beat Me!</h1>
              <img src={img1}></img>
              <div className="met">
                 <Metronome  
                      volume={this.state.volume}
                      startBpm = {120} 
                      frequency={1000}
                      />
              </div>
              <h2>{status}</h2>
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>
              <audio src={mediaBlobUrl} controls autoPlay loop />
              <h2>Score: {this.state.score}</h2>
            </div>
          )}
        />
      </div>
    );}
}
export default Game;
