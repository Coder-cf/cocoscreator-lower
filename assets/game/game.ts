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
const TAG = 'game';
const HEIGHT = 750*2/4
const STEP = 1
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;

    @property
    currentPoint: number = 0;
    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
    }
    gameend(bool:boolean,node:cc.Node){
        if(bool){
            node.active = false
        }else{
            node.parent = null
            this.currentPoint += STEP
        }
    }
    

    update (dt:number) {

    }
}
