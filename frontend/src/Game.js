import React, { Component } from "react";
import './Game.css';

function Game(){
    return(
        <head>
            <link rel="stylesheet" href="Game.css"/>
        </head>,
        <body> 
            <nav>
            <label className="logo">BeatMe!</label>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li className="active"><a className="active" href="/game">Game</a></li>
                    <li><a href='/ranking'>Ranking</a></li>
                </ul>  
            </nav>
            <h1>Play the game!</h1>
            <br></br>
            <h2>Rhythm number 1</h2>
            <br></br>
            <br></br>
            <button className="btn btn2" type="button">REC</button>
            <h2>Score</h2>
        </body>
    );
}

export default Game;