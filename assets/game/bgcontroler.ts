
const {ccclass, property} = cc._decorator;
var HEIGHT = 0
enum Status{SHOW=0,HIDE=1}
@ccclass
export default class NewClass extends cc.Component {

    @property
    rate: number = 10;   //一圈多久
    @property
    begin: number = 0;   //储藏
    @property
    time: number = 4;   //滑板时间
    @property
    instance: number = 100;   //滑板距离
    // LIFE-CYCLE CALLBACKS:
    onLoad(){
       cc.director.on(cc.Director.EVENT_BEFORE_DRAW,()=>{
            HEIGHT = this.node.height/4;
            cc.director.off(cc.Director.EVENT_BEFORE_DRAW);
       });
    }
    reset(){
        this.rate = 10
        this.begin = 0
    }
    update (dt:number) {
        // this.begin+=dt
        // if(this.begin >= this.rate){
        //     this.node.y = -HEIGHT + HEIGHT*2
        //     this.change()
        //     this.begin = 0
        // }else{
        //     this.node.y = -HEIGHT + HEIGHT*2*this.begin/this.rate
        // }
    }
    change(){
        this.node.children[0].getComponent('bgnode').changestatus();
        this.node.children[1].getComponent('bgnode').changestatus();
        this.node.y = -HEIGHT;
    }
    updaterate(num){
        if(num >= 1000){
            this.rate = 2
            this.time = 1
            this.instance = 30
        }else if(num >= 900){
            this.rate = 3
            this.time = 1.2
            this.instance = 40
        }else if(num >= 800){
            this.rate = 4
            this.time = 1.4
            this.instance = 100
        }else if(num >= 700){
            this.rate = 5
            this.time = 3
            this.instance = 70
        }else if(num >= 600){
            this.rate = 6
            this.time = 1.6
            this.instance = 55
        }else if(num >= 500){
            this.rate = 7
            this.time = 1.8
            this.instance = 50
        }else if(num >= 400){
            this.rate = 8
            this.time = 2
            this.instance = 60
        }else if(num >= 100){
            this.rate = 9
            this.time = 3
            this.instance = 70
        }
    }


/*  方法一：action 变速不方便
    start () {
        console.log(TAG,global.type);
        cc.tween(this.bg).repeatForever(cc.sequence(cc.moveBy(2,cc.v2(0,HEIGHT*2)),cc.callFunc(this.reset,this))).start();
    }
    reset(){
        let change:cc.Node = this.bg.children[0];
        change.parent = null;
        let _change:cc.Label =   change.getChildByName('New Label').getComponent(cc.Label);
        _change.string = parseInt(_change.string) + 2 +'';
        this.bg.addChild(change);
        this.bg.y = -HEIGHT;
    }
*/
}
