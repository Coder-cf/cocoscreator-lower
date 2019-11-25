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

    @property(cc.Widget)
    wid: cc.Widget = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    init(node:cc.Node,item,instance,time){
        node.addChild(this.node);
        this.node.width = item.width
        this.node.getComponent(cc.PhysicsBoxCollider).size.width = item.width
        this.node.x = item.x 
        this.node.y =0
        this.wid.target = node
        if(item.istop){
            this.wid.isAlignTop = true
            this.wid.top = item.y
        }else{
            this.wid.isAlignBottom = true
            this.wid.bottom = item.y
        }
        this.wid.updateAlignment()
        let lucheng:number = Math.random()*instance
        cc.tween(this.node).repeatForever(cc.tween()
        .by(time/3,{position:cc.v2(-lucheng,0)})  
        .by(time/3,{position:cc.v2(lucheng*2,0)})
        .by(time/3,{position:cc.v2(-lucheng,0)})).start()
    }
    // update (dt) {}
}
