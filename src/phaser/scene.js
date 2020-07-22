import Phaser from 'phaser';
import GroundSand from '../assets/sprites/groundSand.png';
import CastleWall from '../assets/sprites/castleWall.png';
import StoneWall from '../assets/sprites/stoneWall.png';
import PlatformLong from '../assets/sprites/platformLong.png';
import PlatformShort from '../assets/sprites/platformShort.png';

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
  }
  create() {

    // mouse control group
    var canDrag = this.matter.world.nextGroup();

    // world items
    // main wall building block
    const castleWall = this.matter.add.image(100, 100, 'castleWall', null, 
    { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75}).setCollisionGroup(canDrag);

    const stoneWall = this.matter.add.image(100, 100, 'stoneWall', null, 
    { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75}).setCollisionGroup(canDrag);
    // platforms that blocks rest on
    const platformLong = this.matter.add.image(300, 500, 'platformLong', null, 
    { isStatic: true, friction: 0.9, frictionStatic: 0.75});
    // the ground that the player sees
    const groundSand = this.add.image(0, 450, 'groundSand').setOrigin(0, 0);
    

    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } });

    // tween effects
    this.tweens.add({
      targets: platformLong,
      y: 1000,
      duration: 250000,
      ease: 'power2',
    });
  }
}

export default playGame;
