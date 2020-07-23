import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { LoadScene } from './phaser/load';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    backgroundColor: "#000c1f",
    parent: 'phaser',
    scene: LoadScene,
    physics: { default: "matter" },
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById('root'));

