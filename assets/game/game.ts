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
import {global} from '../global';
import  utils from '../utils';
const TAG = 'game';
const HEIGHT = 750*2/4
const STEP = 1
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    exit: cc.Node = null;
    @property(cc.Node)
    endView: cc.Node = null;
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Label)
    daojishi: cc.Label = null;
    @property
    _currentPoint: number = 0;
    @property
    get currentPoint(){
        return this._currentPoint;
    }
    set currentPoint(value){
        this._currentPoint  = value
        this.label.string = ''+value
        this.bg.getComponent('bgcontroler').updaterate(value)
    }
  

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = 
        // cc.PhysicsManager.DrawBits.e_aabbBit
        //  | cc.PhysicsManager.DrawBits.e_pairBit 
        //  | cc.PhysicsManager.DrawBits.e_centerOfMassBit
        //  | cc.PhysicsManager.DrawBits.e_jointBit 
        //  | cc.PhysicsManager.DrawBits.e_shapeBit
        ;

        this.exit.on('touchstart',()=>{
            cc.director.loadScene('main');
        });
        
    }
    start(){
        this.startGame();
    }
    startGame(){
        let time:number = 2;
        let self:any = this;
        this.daojishi.string = '3'
        this.daojishi.node.active = true
        this.daojishi.schedule(function(){
            if(time--===0){
                self.daojishi.node.active = false
                utils.chooseThenextusefulOne(0);
                self.node.getChildByName('mover').getComponent('mover').startHandler() 
                self.bg.getComponent('bgcontroler').enabled = true
            }else{
                self.daojishi.string = time+1;
            }
        },1,time);
    }
    endGame(){
        this.endView.active = true
    }
    gameend(bool:boolean,node:cc.Node){
        if(bool){
            node.active = false
            cc.director.pause()
            this.endGame()
        }else{
            node.parent = null
            this.currentPoint += STEP
        }
    }
    itemclick(e,cus){
        cc.director.resume();
        if(cus === '0'){
            utils.chooseThenextusefulOne(0);
            this.node.getChildByName('mover').getComponent('mover').startHandler(); 
        }else{
            this.currentPoint = 0
            this.bg.getComponent('bgcontroler').resetGame()
            this.startGame()
        }
        this.endView.active = false
    }
}
