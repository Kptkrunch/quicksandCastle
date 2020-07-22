import Phaser from 'phaser';
import GroundSand from '../assets/sprites/groundSand.png';

class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }
  preload() {
    // assets to prepare
    this.load.image('wall', 'assets/wall.png');
    this.load.image('groundSand', GroundSand);
  }
  create() {

    // mouse control group
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } });
    var canDrag = this.matter.world.nextGroup();

    // world items
    // main wall building block
    const wall = this.matter.add.image(100, 100, 'wall', null, 
    { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75}).setCollisionGroup(canDrag);
    // the ground that the player sees
    const groundSand = this.add.image(0, 450, 'groundSand').setOrigin(0, 0);




    // tween effects
    this.tweens.add({
      targets: wall,
      y: 450,
      duration: 2000,
      ease: 'power2',
      yoyo: true,
      loop: -1
    });
  }
}

export default playGame;
