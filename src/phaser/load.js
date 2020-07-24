// import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
import MainMenu from '../phaser/mainMenu';

import Background from '../assets/sprites/background.jpg';
import Foreground from '../assets/sprites/foreground.png';
import CastleWall from '../assets/sprites/castleWall.png';
import CastleBase from '../assets/sprites/castleBase.png';
import StoneWall from '../assets/sprites/stoneWall.png';
import PlatformLong from '../assets/sprites/platformLong.png';
import TreasureChest from '../assets/sprites/treasureChest.png';

import MudWall from '../assets/sprites/mudWall.png';
import MudWallLong from '../assets/sprites/mudWallLong.png';
import MudWallLongH from '../assets/sprites/mudWallLongH.png';
import StoneWall2 from '../assets/sprites/stoneWall2.png';
import CastleWallLong from '../assets/sprites/castleWallLong.png';
import CastleWallLongH from '../assets/sprites/castleWallLongH.png';

 export default class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: sceneTracker.scenes.load
        })
    }

    preload() {
            // assets to prepare
        this.load.image('background', Background);
        this.load.image('foreground', Foreground);
        this.load.image('castleWall', CastleWall);
        this.load.image('castlebase', CastleBase);
        this.load.image('stoneWall', StoneWall);
        this.load.image('platformLong', PlatformLong);
        this.load.image('treasureChest', TreasureChest);

        this.load.image('mudWall', MudWall);
        this.load.image('mudWallLong', MudWallLong);
        this.load.image('mudWallLongH', MudWallLongH);
        this.load.image('stoneWall2', StoneWall2);
        this.load.image('castleWallLong', CastleWallLong);
        this.load.image('castleWallLongH', CastleWallLongH);

        this.load.audio('gameMusic', '../public/assets/music/desertTrack.mp3');
        this.load.audio('crateSound1', '../public/assets/sounds/crateSound1.mp3');
        this.load.audio('crateSound2', '../public/assets/sounds/crateSound2.mp3');
        this.load.audio('blockGrabSound', '../public/assets/sounds/blockGrabSound.mp3');
        this.load.audio('castleWallSound', '../public/assets/sounds/castleWallSound.mp3');
        this.load.audio('hardCrateSound', '../public/assets/sounds/hardCrateSound.mp3');
        this.load.audio('metalBlockSound', '../public/assets/sounds/metalBlockSound.mp3');

    // Loading progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    create() {
        this.scene.add(sceneTracker.scenes.mainMenu, MainMenu, false);
        this.scene.start(sceneTracker.scenes.mainMenu, 'loading your data');

    }
}
