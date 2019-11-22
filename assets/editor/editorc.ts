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
interface Item {
    width:number;
    x:number;
    istop:boolean;
    y:number;
}
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    root: cc.Node = null;
    @property(cc.Node)
    shower: cc.Node = null;
    @property(cc.Node)
    save: cc.Node = null;
    @property(cc.Node)
    clear: cc.Node = null;
    @property(cc.Node)
    m1: cc.Node = null;
    @property
    model: object[] =[];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.save.on('touchstart',()=>{
            if(!this.root.children.length) return
            let result:Item[] = []
            for(let item of this.root.children){
               result.push(this.dealItem(item))
            }
            this.model.push(result)
            this.clearAll()
        })
        this.clear.on('touchstart',()=>{
            this.clearAll()
        })
        this.m1.on('touchstart',()=>{
            this.m1.active = false
            this.shower.getComponent('showerc').showMe(this.model)
        })
    }
    notify(obj){
        this.model = obj
    }
    dealItem(node:cc.Node):Item{
        return {width:node.width,x:node.x,istop:node.y>0,y:this.node.height/2-Math.abs(node.y)-node.height/2}
    }
    clearAll(){
        this.root.removeAllChildren()
    }

    // update (dt) {}
}
