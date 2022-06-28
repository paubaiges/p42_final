import React, { Component, useEffect, useRef, useState } from "react";
import './index.css';
import { ReactMediaRecorder } from "react-media-recorder";
import { ReactDOM, useSearchParams } from "react";
import { getAudioStream, exportBuffer } from './audio';
import RecorderJS from 'recorder-js';
import {useParams} from 'react-router-dom';
import axios from "axios";
//import '../../backend/mark.py'
import metronomo_audio from './metronome2.wav'

var index_exercise = "0"



const ImageDetail = () => {
  let {name} = useParams();
  let {id} = useParams();
  let img_path = "/images/"+id+".png"
  index_exercise = id;
  return <div>
        <img src={img_path}></img>
        <h2 hidden id="index_exercise"> {id} </h2>
        <h2> Hi {name[0].toUpperCase()+name.substring(1)} press the button below to start the test</h2>
  </div>
}


class Game extends React.Component{
    
    constructor(){
      super();
      this.state = {
        volume:1,
        score:0,
        txt:'Take the test',
        stream: null,
        recording: false,
        recorder: null,
        fb: "ho estàs fent molt bé!",
        first: true,
      };
      this.startRecord = this.startRecord.bind(this);
      this.stopRecord = this.stopRecord.bind(this);
    }

     async componentDidMount() {
    let stream;

    try {
      stream = await getAudioStream();
    } catch (error) {
      // Users browser doesn't support audio.
      // Add your handler here.
      console.log(error);
    }

    this.setState({ stream });
  }

  startRecord() {
    

    const { stream } = this.state;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);

    this.setState(
      {
        recorder,
      },
      () => {
        recorder.start();
      }
    );

  }

  async play_metronome(){
    console.log("esta dentro de play metronome");
    var audio = new Audio(metronomo_audio);
    audio.play();
  }

  async stopRecord(id) {
    const { recorder } = this.state;

    const { buffer } = await recorder.stop()
    const audio = exportBuffer(buffer[0]);

    // Process the audio here.
    console.log(audio);

    // save file
    
    var url = URL.createObjectURL(audio);
    var li = document.createElement('div');
    var au = document.createElement('audio');
    var hf = document.createElement('a');
    
    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = 'exercise.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);

    var recordingslist = document.getElementById('recordingslist');
    recordingslist.textContent = '';
    recordingslist.appendChild(li);
     // send to server 
     
     //const id_exercise = document.getElementById("id_exercise");
     var song_id_blob = new Blob([index_exercise], {
      type: 'text/plain'
    });


    let data = new FormData();
    data.append('wavfile', audio, audio.name);
    data.append('id',song_id_blob,'id')

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    try {
      const resp = await axios.post('http://127.0.0.1:5000/upload', data, config)
      
      console.log(resp.data);
    } catch (error) {
      console.log("estamos en el error");
      console.error(error);
    }
    

    // show feedback 


    // finish
    this.setState({
      recording: false
    });
  }

  do_exercise(){
    this.setState({first: false, recording: true });

    setTimeout(() => {
      console.log('Metronome!');
      this.play_metronome();
    }, 1000);
    setTimeout(() => {
      console.log('Recording!');
      this.startRecord();
    }, 5000);
    setTimeout(() => {
      console.log('Stop Recording!');
      this.stopRecord();
    }, 9000);
  }

  render () {
    const { recording, stream } = this.state;
    
    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    return(
      <div>

        <div class="style">
          <h1> BEAT ME </h1>
        </div>

        <ImageDetail></ImageDetail>
      
        <br></br>
        <button
          onClick={() => {
             this.do_exercise();
          }}
          hidden={recording? true: false}
        >
            Do exercise!
        </button>
        <div id="recordingslist"></div>
        <div hidden={this.state.recording && !this.state.first? true: false}>
          <h2>
            Score: {this.state.score}
          </h2>
          <h2>
            Feedback: {this.state.fb}
          </h2>
        </div>
      </div>

  );}
}
export default Game;
