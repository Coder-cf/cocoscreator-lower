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
const SCORE = 'score';
import  {global}  from '../global';
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    highscore: cc.Label = null;
    onLoad () {
        let score:string = cc.sys.localStorage.getItem(SCORE);
        this.highscore.string = score?score:'0';
    }

    click(e,cus:string){
        global.type = parseInt(cus);
        cc.director.loadScene('game');
    }

    // update (dt) {}
}
