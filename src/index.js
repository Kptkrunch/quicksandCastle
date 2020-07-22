import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import playGame from './phaser/scene';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    backgroundColor: "#000c1f",
    parent: 'phaser',
    scene: playGame,
    physics: { default: "matter" },
    plugins: {
        scene: [
            {
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    }
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));

