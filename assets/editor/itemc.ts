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
const Topinstance = 20+45
const Bottominstance = 20
const Horinstance = 67
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    cut: cc.Label = null;
    @property(cc.Label)
    cutplus: cc.Label = null;
    @property(cc.Label)
    add: cc.Label = null;
    @property(cc.Label)
    addplus: cc.Label = null;
    @property(cc.Label)
    remove: cc.Label = null;
    @property(cc.Label)
    save: cc.Label = null;
    @property(cc.Node)
    smallnode: cc.Node = null;
    @property(cc.Node)
    miaonode: cc.Node = null;
    @property
    status: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart',this.touchstart,this);
        this.node.on('touchmove',this.touchmove,this);
        this.node.on('touchend',this.touchend,this);
        this.node.on('touchcancel',this.touchcancel,this);
        this.add.node.on('touchstart',(event)=>{
            event.stopPropagation()
                this.node.width ++
        });
        this.cut.node.on('touchstart',(event)=>{
            event.stopPropagation()
                this.node.width --
        });
        this.addplus.node.on('touchstart',(event)=>{
            event.stopPropagation()
            this.node.width += 10
        });
        this.cutplus.node.on('touchstart',(event)=>{
            event.stopPropagation()
            this.node.width -= 10
        });
        this.remove.node.on('touchstart',(event)=>{
            event.stopPropagation()
            this.node.parent = null
            this.node.destroy()
        });
        this.save.node.on('touchstart',(event)=>{
            event.stopPropagation()
            this.controlAll(false)
        });
    }
    controlAll(bool:boolean){
        this.add.node.active = bool
        this.cut.node.active = bool
        this.addplus.node.active = bool
        this.cutplus.node.active = bool
        this.remove.node.active = bool
        this.save.node.active = bool
    }
    touchstart(e:cc.Event.EventTouch){
        console.log('touchstart')
        if(this.status){
            this.controlAll(true)
        }else{
            let _node:cc.Node = cc.instantiate(this.node)
            this.smallnode = _node
            let _com =  _node.getComponent('itemc')
            _com.status = true
            _node.position =  e.getLocation()
            _node.parent = cc.director.getScene()
        }
    }
    touchmove(e:cc.Event.EventTouch){
        console.log('touchmove')
        if(!this.status && this.smallnode){
            let _location:cc.Vec2 = e.getLocation()
            if(this.isinBox(_location)){
                this.smallnode.active = true
                this.smallnode.position = _location
            }else{
                this.smallnode.active = false
            }
        }
    }
    touchend(e:cc.Event.EventTouch){
        console.log('touchend')
        this.endcheck(e)
    }
    touchcancel(e:cc.Event.EventTouch){
        console.log('touchcancel')
        this.endcheck(e)
    }
    endcheck(e:cc.Event.EventTouch){
        if(!this.status && this.smallnode){
            let _location:cc.Vec2 = e.getLocation()
            if(this.isinBox(_location)){
                this.smallnode.position = _location
                this.smallnode.parent = null
                this.smallnode.position = this.miaonode.convertToNodeSpaceAR(_location)
                this.miaonode.addChild(this.smallnode)
            }else{
                this.smallnode.parent = null
                this.smallnode.destroy()
               
            }
            this.smallnode = null
        }
    }
    isinBox(point:cc.Vec2):boolean{
        return (point.x <= (this.miaonode.width-Horinstance-this.node.width/2) && point.x >= Horinstance + this.node.width/2
        && point.y<=(this.miaonode.height-Topinstance)&& point.y >= Bottominstance)
    }
    start () {
        if(this.status){
            this.node.off('touchmove');
            this.node.off('touchend');
            this.node.off('touchcancel');
        }
    }

    // update (dt) {}
}
