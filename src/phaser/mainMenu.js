import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
import Title from '../assets/sprites/title.png';
import BackgroundD from '../assets/sprites/backgroundD.png';
// import BackgroundN from '../assets/sprites/backgroundN.png';
import StartButton from '../assets/sprites/startButton.png';
import Level1 from '../phaser/level1';

var startButton;
var title;
var background;

export class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: sceneTracker.scenes.mainMenu
        })
    }

    init(data) {

        console.log('I got it');
    }

    preload() {
        this.load.image('title', Title); 
        this.load.image('background', BackgroundD);
        this.load.image('startButton', StartButton);  
    }

    create() {

        background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        title = this.add.image(600, 200, 'title');
        startButton = this.add.image(600, 400, 'startButton')
            .setInteractive();

        startButton.on('pointerdown', () => {
            console.log('hooray');
            this.scene.add(sceneTracker.scenes.level1, Level1, true);

            this.scene.start(sceneTracker.scenes.level1);
        })
    }

    update() {
    }
}