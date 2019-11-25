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
    @property(cc.RigidBody)
    rbody: cc.RigidBody = null;
    @property
    text: string = 'hello';

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
    }
    onKeyPressed(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            this.rbody.linearVelocity = cc.v2(-1000,0);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
            this.rbody.linearVelocity = cc.v2(1000,0);
                break;
        }
    }
    onKeyReleased(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.rbody.linearVelocity = cc.v2(0,0);
                break;
        }
    }

    // update (dt) {}
}
