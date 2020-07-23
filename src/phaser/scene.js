import Phaser from 'phaser';
import GroundSand from '../assets/sprites/groundSand.png';
import CastleWall from '../assets/sprites/castleWall.png';
import StoneWall from '../assets/sprites/stoneWall.png';
import PlatformLong from '../assets/sprites/platformLong.png';
import PlatformShort from '../assets/sprites/platformShort.png';
import TreasureChest from '../assets/sprites/treasureChest.png';
import CastleBase from '../assets/sprites/castleBase.png';

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
    this.load.image('castleBase', CastleBase);
  }

  create() {

    // set the group for what items can be manipulated
    var canDrag = this.matter.world.nextGroup();
    var cannotDrag = this.matter.world.nextGroup();
    // collision categories
    var blocks = this.matter.world.nextCategory();
    var platforms = this.matter.world.nextCategory();

    // ? world items ===========================================
    // ? =======================================================

    // const objOptions = { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, restitution: 0};
    const castleWall = this.matter.add.image(800, 100, 'castleWall', null, { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, frictionAir: 0.2, restitution: 0}).setCollisionGroup(canDrag);
    const stoneWall = this.matter.add.image(750, 100, 'stoneWall', null, { chamfer: 16, density: 30, friction: 0.6, frictionStatic: 0.75, frictionAir: 0.2, restitution: 0}).setCollisionGroup(canDrag);
    const treasureChest = this.matter.add.image(875, 100, 'treasureChest', { chamfer: 16, density: 40, friction: 0.6, frictionStatic: 9.0, frictionAir: 0.2, restitution: 0}).setCollisionGroup(canDrag);

    // ? platforms that blocks rest on
    const platformLong = this.matter.add.image(600, 500, 'platformLong', null, 
      { isStatic: true, friction: 0.9, frictionStatic: 0.75 });

    const castleBase = this.matter.add.image(800, 400, 'castleBase', null, 
      { isStatic: false, chamfer: 10, density: 35, friction: 1.0, restitution: 0 });

    // ? the ground that the player sees
    const groundSand = this.add.image(0, 450, 'groundSand', {isStatic: true}).setOrigin(0, 0);


    // ? collision events ======================================
    // ? =======================================================

    castleWall.setCollisionCategory(blocks);
    stoneWall.setCollisionCategory(blocks);
    treasureChest.setCollisionCategory(blocks);
    platformLong.setCollisionGroup(platforms);


    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      

      console.log(bodyB)
      if(bodyB.id === 4) {

        event.pairs[0].bodyA.gameObject.setTint('0x757575');
        // event.pairs[0].bodyA.gameObject.isStatic(true);
        event.pairs[0].bodyA.gameObject.setCollisionGroup(cannotDrag);
        // event.pairs[0].bodyA.gameObject.frictionAir = .6;
      }

    });

    // this.matter.world.on('collisionactive', function (event, bodyA, bodyB) {

    //   bodyA = blocks;
    //   bodyB = platforms;

    //   event.pairs[0].bodyA.gameObject.setTint(0xff0000);
    //   event.pairs[0].bodyA.timeScale = .1;
    // });

    // this.matter.world.on('collisionEnd', function (event, bodyA, bodyB) {
    //   bodyA = blocks;
    //   bodyB = platforms;
    //   event.pairs[0].bodyA.timeScale = 1.0;
    // });

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
