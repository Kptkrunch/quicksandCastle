import Phaser from 'phaser';
import GroundSand from '../assets/sprites/groundSand.png';
import CastleWall from '../assets/sprites/castleWall.png';
import StoneWall from '../assets/sprites/stoneWall.png';
import PlatformLong from '../assets/sprites/platformLong.png';
import PlatformShort from '../assets/sprites/platformShort.png';
import TreasureChest from '../assets/sprites/treasureChest.png';

class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  preload() {
    // assets to prepare
    this.load.image('castleWall', CastleWall);
    this.load.image('groundSand', GroundSand);
    this.load.image('stoneWall', StoneWall);
    this.load.image('platformLong', PlatformLong);
    this.load.image('platformShort', PlatformShort);
    this.load.image('treasureChest', TreasureChest);
  }

  create() {

    // set the group for what items can be manipulated
    var canDrag = this.matter.world.nextGroup();
    var blocks = this.matter.world.nextCategory();
    var platforms = this.matter.world.nextCategory();

    // ? world items ===========================================
    // ? =======================================================

    const objOptions = { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, restitution: 0.0};
    const castleWall = this.matter.add.image(700, 100, 'castleWall', null, objOptions).setCollisionGroup(canDrag);
    const stoneWall = this.matter.add.image(100, 100, 'stoneWall', null, objOptions).setCollisionGroup(canDrag);
    const treasureChest = this.matter.add.image(300, 100, 'treasureChest', objOptions).setCollisionGroup(canDrag);
    // ! platforms that blocks rest on
    const platformLong = this.matter.add.image(600, 500, 'platformLong', null, 
    { isStatic: true, friction: 0.9, frictionStatic: 0.75 });
    // the ground that the player sees
    const groundSand = this.add.image(0, 450, 'groundSand', {isStatic: true}).setOrigin(0, 0);


    // ? collision events ======================================
    // ? =======================================================

    castleWall.setCollisionCategory(blocks);
    stoneWall.setCollisionCategory(blocks);
    platformLong.setCollisionGroup(platforms);


    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      bodyA = blocks;
      bodyB = platforms;

      event.pairs[0].bodyA.gameObject.setTint(0xff0000);
      event.pairs[0].bodyA.timeScale = .1;
    });

    // this.matter.world.on('collisionactive', function (event, bodyA, bodyB) {

    //   event.pairs[0].bodyB.timeScale = .1;
    // });

    this.matter.world.on('collisionEnd', function (event, bodyA, bodyB) {
      bodyA = blocks;
      bodyB = platforms;
      event.pairs[0].bodyA.timeScale = 1.0;
    });

    // allows the group 'canDrag' to be movable with the mouse
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } });

    // ? tweens ================================================
    // ? =======================================================

    setTimeout(() => {

      this.tweens.add({
        targets: platformLong,
        y: 1000,
        duration: 250000,
        ease: 'power2',
      });
    }, 10000);

  }

  update() {
    
  }
}




export default playGame;
