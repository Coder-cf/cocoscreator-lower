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
import {global} from './../global';
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    status:number = 0 ;
    @property(cc.JsonAsset)
    lists:cc.JsonAsset = null;
    @property(cc.Prefab)
    step: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    inititems(){
        let items = this.lists.json[(parseInt(this.label.string)-1)%this.lists.json.length]
        let _com = this.node.parent.getComponent('bgcontroler')
        for(let item of items){
            let _node:cc.Node = cc.instantiate(this.step)
            _node.getComponent('stepc').init(this.node,item,_com.instance,_com.time,global.type)
        }
    }
    onEnable(){
        this.inititems()
    }
    onDisable(){
       this.removeItems()
    }
    resetStatus(num){
        if(num === 0){
            this.node.getChildByName('New Label').getComponent(cc.Label).string = 1+''
            this.node.y = this.node.height/2
        }else{
            this.node.getChildByName('New Label').getComponent(cc.Label).string = 2+''
            this.node.y = -this.node.height/2
        }
        this.enabled = false
        this.status = num
        this.enabled = true
    }
    changestatus(){
        if(this.status === 0){
            let label:cc.Label =    this.node.getChildByName('New Label').getComponent(cc.Label);
            label.string = parseInt(label.string) + 2 + '';
            this.status = 1;
            this.removeItems()
            this.inititems()
            this.node.y -= this.node.height;
        }else{
            this.node.y += this.node.height;
            this.status = 0;
        }
    }
    removeItems(){
        // this.node.removeAllChildren()
        let length:number = this.node.children.length -1
        for(;length>=1;length--){
            this.node.children[length].parent = null
        }
    }

    // update (dt) {}
}
