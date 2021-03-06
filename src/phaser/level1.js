import Phaser from 'phaser';
import { sceneTracker } from '../sceneTracker';
import CastleBase from '../assets/sprites/castleBase.png';
import MudWall from '../assets/sprites/mudWall.png';
import MudWallLong from '../assets/sprites/mudWallLong.png';
import MudWallLongH from '../assets/sprites/mudWallLongH.png';
import StoneWall2 from '../assets/sprites/stoneWall2.png';
import CastleWallLong from '../assets/sprites/castleWallLong.png';
import CastleWallLongH from '../assets/sprites/castleWallLongH.png';

var treasureChest;
var castleWall;
var castleBase;
var stoneWall;
var platformLong;
var foreground;
var background;
var allBlocks;
var randomBlock;

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({
      key: sceneTracker.scenes.level1
    });
  }

  preload() {
    this.load.image('castleBase', CastleBase);
    this.load.image('mudWall', MudWall);
    this.load.image('mudWallLong', MudWallLong);
    this.load.image('mudWallLongH', MudWallLongH);
    this.load.image('stoneWall2', StoneWall2);
    this.load.image('castleWallLong', CastleWallLong);
    this.load.image('castleWallLongH', CastleWallLongH);
  }

  create() {
    // scene start effect
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    
    // ? Sounds ================================================
    // ? =======================================================

    var crateSound1 = this.sound.add('crateSound1', {volume: 1.0});
    var crateSound2 = this.sound.add('crateSound2', {volume: 1.0});
    var blockGrabSound = this.sound.add('blockGrabSound', {volume: 1.0});
    var castleWallSound = this.sound.add('castleWallSound', {volume: 1.0});
    var hardCrateSound = this.sound.add('hardCrateSound', {volume: 1.0});
    var metalBlockSound = this.sound.add('metalBlockSound', {volume: 1.0});

    this.sound.pauseOnBlur = false;
    this.sound.play('gameMusic', {
        loop: true,
    });

    // ? world items ===========================================
    // ? =======================================================

    // set the group for what items can be manipulated
    var canDrag = this.matter.world.nextGroup();
    var cannotDrag = this.matter.world.nextGroup();
    // collision categories
    var blocks = this.matter.world.nextCategory();
    var platforms = this.matter.world.nextCategory();
    var noCollide = this.matter.world.nextCategory();

    background = this.add.image(0, 0, 'background')
      .setOrigin(0, 0);

    // const objOptions = { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, restitution: 0};
    castleWall = this.matter.add.image(800, 100, 'castleWall', null, 
      { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, frictionAir: 0.05, restitution: 0, label: 'castleWall'})
      .setCollisionGroup(canDrag)
      .setCollisionCategory(blocks);

    // large stone block
    stoneWall = this.matter.add.image(750, 100, 'stoneWall', null, 
      { chamfer: 16, density: 30, friction: 0.6, frictionStatic: 0.75, frictionAir: 0.05, restitution: 0, label: 'stoneWall'})
      .setCollisionGroup(canDrag)
      .setCollisionCategory(blocks);

    // treasure chest win condition piece
    treasureChest = this.matter.add.image(875, 100, 'treasureChest', null,
      { chamfer: 16, density: 40, friction: 0.6, frictionStatic: .75, frictionAir: 0.05, restitution: 0, label: 'treasureChest'})
      .setCollisionGroup(canDrag)
      .setCollisionCategory(blocks);

    // ? platforms that blocks rest on
    platformLong = this.matter.add.image(600, 550, 'platformLong', null, 
      { isStatic: true, friction: 0.9, frictionStatic: 0.75, label: 'platformLong' })
      .setCollisionCategory(platforms)
      .setVisible(false);

    // starting platform for blocks
    castleBase = this.matter.add.image(800, 400, 'castleBase', null,
      { isStatic: false, chamfer: 10, density: 35, friction: 1.0, restitution: 0 })
      .setCollisionCategory(platforms)

    // ? make it rain blocks
    allBlocks = ['mudWall', 'stoneWall', 'castleWall'];
    let makeBlocks = () => {
      
      for(let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * allBlocks.length);
        randomBlock = this.matter.add.image((Math.random() * 100) + 700, (Math.random() * 200) - 400, allBlocks[index], null, 
          {chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, frictionAir: 0.05, restitution: 0, label: 'randomBlock'})
          .setCollisionGroup(canDrag)
          .setCollisionCategory(blocks);
      }
    }
    makeBlocks();
    randomBlock.setCollisionGroup(canDrag);
    randomBlock.setCollisionCategory(blocks);

    // ? the ground that the player sees
    foreground = this.matter.add.image(0, 475, 'foreground', {isStatic: true, label: 'foreground'}).setOrigin(0, 0)
      .setCollisionCategory(noCollide)
      .setIgnoreGravity(true);

    // ? collision events ======================================
    // ? =======================================================

    // what objects collide with 
    stoneWall.setCollidesWith([blocks, platforms ]);
    castleWall.setCollidesWith([blocks, platforms ]);
    treasureChest.setCollidesWith([blocks, platforms ]);
    castleBase.setCollidesWith([blocks, platforms ]);
    foreground.setCollidesWith([noCollide]);
    platformLong.setCollidesWith([blocks, platforms ]);
    randomBlock.setCollidesWith([blocks, platforms ]);


    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      
      if(bodyB.label === 'platformLong') {

        event.pairs[0].bodyA.gameObject.setTint('0x757575');
        event.pairs[0].bodyA.gameObject.setCollisionGroup(cannotDrag);
      } 
    });

    this.matter.world.on('collisionstart', function (event, block, platforms) {

        switch(block.label) {

          case 'castleWall':
            crateSound2.play();
            break;
          case 'treasureChest':
            crateSound1.play();
            break;
          case 'stoneWall':
            castleWallSound.play();
            break;
          case 'randomBlock':
            castleWallSound.play();
            break;
          case 'mudWall':
            crateSound1.play();
            break;
        }
    });

    // allows the group 'canDrag' to be movable with the mouse
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.8, collisionFilter: { group: canDrag } });

    // ? tweens ================================================
    // ? =======================================================

    // causes the ground to start sinking
    setTimeout(() => {
      
      this.tweens.add({
        targets: platformLong,
        y: 1000,
        duration: 250000,
        ease: 'power2',
      });
    }, 10000);
  }
}


// import Background from '../assets/sprites/background.jpg';
// import Foreground from '../assets/sprites/foreground.png';
// import CastleWall from '../assets/sprites/castleWall.png';
// import CastleBase from '../assets/sprites/castleBase.png';
// import StoneWall from '../assets/sprites/stoneWall.png';
// import PlatformLong from '../assets/sprites/platformLong.png';
// import TreasureChest from '../assets/sprites/treasureChest.png';

// import MudWall from '../assets/sprites/mudWall.png';
// import MudWallLong from '../assets/sprites/mudWallLong.png';
// import MudWallLongH from '../assets/sprites/mudWallLongH.png';
// import StoneWall2 from '../assets/sprites/stoneWall2.png';
// import CastleWallLong from '../assets/sprites/castleWallLong.png';
// import CastleWallLongH from '../assets/sprites/castleWallLongH.png';

    // assets to prepare
    // this.load.image('background', Background);
    // this.load.image('foreground', Foreground);
    // this.load.image('castleWall', CastleWall);
    // this.load.image('castlebase', CastleBase);
    // this.load.image('stoneWall', StoneWall);
    // this.load.image('platformLong', PlatformLong);
    // this.load.image('treasureChest', TreasureChest);

    // this.load.image('mudWall', MudWall);
    // this.load.image('mudWallLong', MudWallLong);
    // this.load.image('mudWallLongH', MudWallLongH);
    // this.load.image('stoneWall2', StoneWall2);
    // this.load.image('castleWallLong', CastleWallLong);
    // this.load.image('castleWallLongH', CastleWallLongH);

    // this.load.audio('gameMusic', '../public/assets/music/desertTrack.mp3');
    // this.load.audio('crateSound1', '../public/assets/sounds/crateSound1.mp3');
    // this.load.audio('crateSound2', '../public/assets/sounds/crateSound2.mp3');
    // this.load.audio('blockGrabSound', '../public/assets/sounds/blockGrabSound.mp3');
    // this.load.audio('castleWallSound', '../public/assets/sounds/castleWallSound.mp3');
    // this.load.audio('hardCrateSound', '../public/assets/sounds/hardCrateSound.mp3');
    // this.load.audio('metalBlockSound', '../public/assets/sounds/metalBlockSound.mp3');