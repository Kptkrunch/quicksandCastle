import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
import {MainMenu} from './mainMenu';

 export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: sceneTracker.scenes.load
        })
    }

    preload() {

    }

    create() {
        this.scene.add(sceneTracker.scenes.mainMenu, MainMenu, false);
        this.scene.start(sceneTracker.scenes.mainMenu, 'loading your data');

    }
}
