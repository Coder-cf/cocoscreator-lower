// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { global } from "./../global";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.RigidBody)
    rbody: cc.RigidBody = null;
    @property
    speed: cc.Vec2 = cc.v2(0, 0);
    @property
    maxSpeed: cc.Vec2 = cc.v2(2000, 2000);
    @property
    gravity:number =  -120;
    @property
    drag:number = 120;
    @property
    direction:number =  0;
    @property
    _lastSpeedY:number = 0;
    @property
    collisionX:number = 0;
    @property
    collisionY:number = 0;
    // @property
    // jumpSpeed:number = 300;
    @property
    jumping:boolean = true;
    @property
    text: string = 'hello';
    onLoad(){
        if(global.type){
            this.node.getComponent(cc.PhysicsCircleCollider).enabled= true;
        }else{  
            this.node.getComponent(cc.BoxCollider).enabled= true;
        }
    }
    // LIFE-CYCLE CALLBACKS:
    startHandler(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }
    onDisable(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP);
    }
    removeMine(posi){
        this.node.position = posi
        if(global.type){
            this.rbody.linearVelocity = cc.v2(0,0);
        }else{
            this.direction = 0;  
            this.jumping = true;
            this.speed = cc.v2(0,0);
            this._lastSpeedY = 0;
            this.collisionX = 0;
            this.collisionY = 0;
        }
    }
    onKeyPressed(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            if(global.type){
                this.rbody.linearVelocity =cc.v2(-1000,this.rbody.linearVelocity.y);
            }else{
                this.direction = -1;  
            }
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
            if(global.type){
                this.rbody.linearVelocity =cc.v2(1000,this.rbody.linearVelocity.y);
            }else{
                this.direction = 1;  
            }
                break;
            // case cc.macro.KEY.w:
            // case cc.macro.KEY.up:
            //     if(global.type){
            //         this.rbody.linearVelocity =cc.v2(this.rbody.linearVelocity.x,this.jumpSpeed);
            //         console.log(this.rbody.linearVelocity);
            //     }else{
            //         this.direction = 1;  
            //         if (!this.jumping) {
            //             this.jumping = true;
                    
            //         }
            //     }
            //     break;
        }
    }
    onKeyReleased(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
            if(global.type){
                this.rbody.linearVelocity =cc.v2(0,this.rbody.linearVelocity.y);
            }else{
                this.direction = 0;
            }
               
                break;
        }
    }
    onCollisionEnter(other,self) {
        // console.log('on collision enter');
        var otherAabb:cc.Rect = other.world.aabb;
        var otherPreAabb:cc.Rect = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                // this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(otherPreAabb.xMax,0)).x + this.node.width/2;
                this.node.x = otherPreAabb.xMax + this.node.width/2;
                this.collisionX = -1;
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                // this.node.x = this.node.parent.convertToNodeSpaceAR(cc.v2(otherPreAabb.xMin,0)).x - this.node.width/2;
                this.node.x = otherPreAabb.xMin - this.node.width/2;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                // this.node.y =  this.node.parent.convertToNodeSpaceAR(cc.v2(0,otherPreAabb.yMax)).y + this.node.height/2;
                this.node.y = otherPreAabb.yMax + this.node.height/2;
                this.jumping = false;
                this.collisionY = -1;
            }
            // else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
            //     this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
            //     this.collisionY = 1;
            // }
            
            this.speed.y = 0;
            this._lastSpeedY = 0;
            other.touchingY = true;
        }    
    }
    onCollisionStay(other,self) {
        if (this.collisionY === -1) {
            if (other.node.group === 'step') {
                // this.node.y =  this.node.parent.convertToNodeSpaceAR(cc.v2(0,other.world.aabb.yMax)).y + this.node.height/2    
                this.node.y = other.world.aabb.yMax + this.node.height/2;
            }
        }
        
    }
    onCollisionExit(other,self) {
        // console.log('on collision exit');
        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
        }
    }
    update (dt:number) {
        if(global.type)return
        if (this.jumping) {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }
        if (this.direction === 0) { 
            //x 轴减速的过程
            // if (this.speed.x > 0) {    
            //     this.speed.x -= this.drag*4 * dt; //1000 * 0.016 
            //     if (this.speed.x <= 0) this.speed.x = 0;
            // }
            // else if (this.speed.x < 0) {
            //     this.speed.x += this.drag*4 * dt;
            //     if (this.speed.x >= 0) this.speed.x = 0;
            // }
            this.speed.x = 0;
        }
        else {
            //x轴加速的过程
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
        }

        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }
        this.node.x += this.speed.x * dt;
        this.node.y += (this._lastSpeedY + this.speed.y) * dt / 2;
        this._lastSpeedY = this.speed.y;
    }
}
