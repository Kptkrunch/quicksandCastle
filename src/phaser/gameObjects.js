import Phaser from 'phaser';
import GroundSand from '../assets/sprites/groundSand.png';
import CastleWall from '../assets/sprites/castleWall.png';
import StoneWall from '../assets/sprites/stoneWall.png';
import PlatformLong from '../assets/sprites/platformLong.png';
import PlatformShort from '../assets/sprites/platformShort.png';
import TreasureChest from '../assets/sprites/treasureChest.png';

this.load.image('castleWall', CastleWall);
this.load.image('groundSand', GroundSand);
this.load.image('stoneWall', StoneWall);
this.load.image('platformLong', PlatformLong);
this.load.image('platformShort', PlatformShort);
this.load.image('treasureChest', TreasureChest);

var canDrag = this.matter.world.nextGroup();

// world items
// main wall building block
const objOptions = { chamfer: 16, density: 30, friction: 0.9, frictionStatic: 0.75, restitution: 0.0};
const castleWall = this.matter.add.image(100, 100, 'castleWall', null, objOptions).setCollisionGroup(canDrag);

const stoneWall = this.matter.add.image(100, 100, 'stoneWall', null, objOptions).setCollisionGroup(canDrag);

const treasureChest = this.matter.add.image(300, 100, 'treasureChest', objOptions).setCollisionGroup(canDrag);

// platforms that blocks rest on
const platformLong = this.matter.add.image(600, 500, 'platformLong', null, 
{ isStatic: true, friction: 0.9, frictionStatic: 0.75});
// the ground that the player sees
const groundSand = this.matter.add.sprite(0, 450, 'groundSand', {isStatic: true}).setOrigin(0, 0);

module.exports = {

    stoneWall, castleWall, platformLong, platformShort, treasureChest, groundSand
}