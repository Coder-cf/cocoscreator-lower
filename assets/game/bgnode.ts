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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    status:number = 0 ;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    changestatus(){
        if(this.status === 0){
            this.node.y -= this.node.height;
            let label:cc.Label =    this.node.getChildByName('New Label').getComponent(cc.Label);
            label.string = parseInt(label.string) + 2 + '';
            this.status = 1;
        }else{
            this.node.y += this.node.height;
            this.status = 0;
        }
    }

    // update (dt) {}
}
