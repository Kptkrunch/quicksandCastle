import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
// import { Level1 } from '../phaser/level1';
import Level1 from '../phaser/level1';
import BackgroundD from '../assets/sprites/backgroundD.png';
// import BackgroundN from '../assets/sprites/backgroundN.png';
import Title from '../assets/sprites/title.png';
import StartButton from '../assets/sprites/startButton.png';

var startButton;
var title;
var backgroundD;

export default class MainMenu extends Phaser.Scene {
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
        this.load.image('backgroundD', BackgroundD);
        this.load.image('startButton', StartButton); 
        this.load.audio('menuMusic', ['../public/assets/music/otherTrack.mp3']); 
        this.load.audio('startButtonSound', '../public/assets/sounds/startButtonSound.mp3');
    }

    create() {

        backgroundD = this.add.image(0, 0, 'backgroundD').setOrigin(0, 0);
        title = this.add.image(600, 200, 'title');
        startButton = this.add.image(600, 400, 'startButton')
            .setInteractive();

        startButton.on('pointerdown', () => {
            console.log('hooray');
            this.scene.add(sceneTracker.scenes.level1, Level1, false);
            this.scene.start(sceneTracker.scenes.level1);
            startButtonSound.play();
            menuMusic.stop();
        })

        let startButtonSound = this.sound.add('startButtonSound', {volume: 3.0});

        let menuMusic = this.sound.add('menuMusic', {
            loop: true
        });
        menuMusic.play();
    }

    update() {
    }
}