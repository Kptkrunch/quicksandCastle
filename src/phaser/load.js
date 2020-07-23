import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
import { MainMenu } from '../phaser/mainMenu';

 export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: sceneTracker.scenes.load
        })
    }

    preload() {

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 'red'
            }
        })

        this.load.on('progress', (percent) => {
            laodingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on('complete', () => {
            console.log(done);
        })
    }

    create() {
        this.scene.add(sceneTracker.scenes.mainMenu, MainMenu, false);
        this.scene.start(sceneTracker.scenes.mainMenu, 'loading your data');

    }
}
