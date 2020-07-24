import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
import Level1 from '../phaser/level1';
import BackgroundD from '../assets/sprites/backgroundD.png';
import Title from '../assets/sprites/title.png';
import StartButton from '../assets/sprites/startButton.png';
import Cloud1 from '../assets/sprites/cloud1.png';
import Cloud2 from '../assets/sprites/cloud2.png';
import Cloud3 from '../assets/sprites/cloud3.png';

var startButton;
var title;
var backgroundD;
var cloud1;
var cloud2;
var cloud3;

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: sceneTracker.scenes.mainMenu
        })
    }

    init(data) {
    }

    preload() {
        this.load.image('title', Title); 
        this.load.image('backgroundD', BackgroundD);
        this.load.image('startButton', StartButton); 
        this.load.image('cloud1', Cloud1); 
        this.load.image('cloud2', Cloud2); 
        this.load.image('cloud3', Cloud3); 
        this.load.audio('menuMusic', ['../public/assets/music/otherTrack.mp3']); 
        this.load.audio('startButtonSound', '../public/assets/sounds/startButtonSound.mp3');
    }

    create() {

        let startButtonSound = this.sound.add('startButtonSound', {volume: 3.0});

        let menuMusic = this.sound.add('menuMusic', {
            loop: true
        });
        menuMusic.play();

        backgroundD = this.add.image(0, 0, 'backgroundD').setOrigin(0, 0);
        cloud1 = this.add.image(700, 70, 'cloud1');
        cloud2 = this.add.image(75, 110, 'cloud2');
        title = this.add.image(600, 200, 'title');
        cloud3 = this.add.image(400, 245, 'cloud3');
        startButton = this.add.image(600, 400, 'startButton')
            .setInteractive();

        this.tweens.add({
            targets: [cloud1, cloud3],
            x: 1500,
            duration: 150000,
            ease: 'power2',
        });

        this.tweens.add({
            targets: cloud2,
            x: 1500,
            duration: 170000,
            ease: 'power2',
        });

        startButton.on('pointerdown', () => {
            
            this.scene.add(sceneTracker.scenes.level1, Level1, false);

            startButtonSound.play();
            menuMusic.stop();

            this.cameras.main.fadeOut(1000);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

                this.time.delayedCall(1000, () => {

                    this.scene.start(sceneTracker.scenes.level1);
                })
            })
        })
    }
}