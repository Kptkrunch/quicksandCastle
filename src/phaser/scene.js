import Phaser from 'phaser';
import Background from '../assets/sprites/background.jpg';
import Foreground from '../assets/sprites/foreground.png';
import CastleWall from '../assets/sprites/castleWall.png';
import StoneWall from '../assets/sprites/stoneWall.png';
import PlatformLong from '../assets/sprites/platformLong.png';
import TreasureChest from '../assets/sprites/treasureChest.png';
import CastleBase from '../assets/sprites/castleBase.png';

var treasureChest;
var castleWall;
var castleBase;
var stoneWall;
var platformLong;
var foreground;

class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  preload() {
    // assets to prepare
    this.load.image('background', Background);
    this.load.image('foreground', Foreground);
    this.load.image('castleWall', CastleWall);
    // this.load.image('groundSand', GroundSand);
    this.load.image('stoneWall', StoneWall);
    this.load.image('platformLong', PlatformLong);
    // this.load.image('platformShort', PlatformShort);
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
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0);
    // const objOptions = { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, restitution: 0};
    castleWall = this.matter.add.image(800, 100, 'castleWall', null, 
      { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, frictionAir: 0.025, restitution: 0, label: 'castleWall'})
      .setCollisionGroup(canDrag)
      .setCollisionCategory(blocks);

    // large stone block
    stoneWall = this.matter.add.image(750, 100, 'stoneWall', null, 
      { chamfer: 16, density: 30, friction: 0.6, frictionStatic: 0.75, frictionAir: 0.025, restitution: 0, label: 'stoneWall'})
      .setCollisionGroup(canDrag)
      .setCollisionCategory(blocks);

    // treasure chest win condition piece
    treasureChest = this.matter.add.image(875, 100, 'treasureChest', 
      { chamfer: 16, density: 40, friction: 0.6, frictionStatic: 9.0, frictionAir: 0.3, restitution: 0, label: 'treasureChest'})
      .setCollisionGroup(canDrag)
      .setCollisionCategory(blocks);

    // ? platforms that blocks rest on
    platformLong = this.matter.add.image(600, 550, 'platformLong', null, 
      { isStatic: true, friction: 0.9, frictionStatic: 0.75, label: 'platformLong' })
      .setCollisionGroup(platforms)
      .setVisible(false);

    // starting platform for blocks
    castleBase = this.matter.add.image(800, 450, 'castleBase', null, 
      { isStatic: false, chamfer: 10, density: 35, friction: 1.0, restitution: 0 })

    // ? the ground that the player sees
    foreground = this.add.image(0, 475, 'foreground', {isStatic: true}).setOrigin(0, 0);

    // ? collision events ======================================
    // ? =======================================================

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      
      if(bodyB.label === 'platformLong') {

        event.pairs[0].bodyA.gameObject.setTint('0x757575');
        event.pairs[0].bodyA.gameObject.setCollisionGroup(cannotDrag);
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




export default playGame;
