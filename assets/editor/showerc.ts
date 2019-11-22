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

    @property(cc.EditBox)
    label: cc.EditBox = null;

    @property(cc.Node)
    g2: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.g2.on('touchstart',()=>{
            this.node.x =867
            cc.find('Canvas').getComponent('editorc').m1.active = true
        })
    }
    showMe(model){
        this.label.string = JSON.stringify(model,undefined,4)
        this.node.x = 467
    }
    editend(){
        try {
           cc.find('Canvas').getComponent('editorc').notify(JSON.parse(this.label.string))    
        } catch (error) {
            console.log(error)
            cc.find('Canvas').getComponent('editorc').notify([]) 
            this.label.string = ''
        }
    }

    // update (dt) {}
}
