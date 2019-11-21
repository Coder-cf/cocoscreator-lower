
const {ccclass, property} = cc._decorator;
const HEIGHT = 750*2/4
enum Status{SHOW=0,HIDE=1}
@ccclass
export default class NewClass extends cc.Component {

    @property
    rate: number = 10;   //一圈多久
    @property
    begin: number = 0;   //储藏
    // LIFE-CYCLE CALLBACKS:

    reset(){
        this.rate = 10
        this.begin = 0
    }
    update (dt:number) {
        this.begin+=dt
        if(this.begin >= this.rate){
            this.node.y = -HEIGHT + HEIGHT*2
            this.change()
            this.begin = 0
        }else{
            this.node.y = -HEIGHT + HEIGHT*2*this.begin/this.rate
        }
    }
    change(){
        this.node.children[0].getComponent('bgnode').changestatus();
        this.node.children[1].getComponent('bgnode').changestatus();
        this.node.y = -HEIGHT;
    }
    updaterate(num){
        if(num >= 1000){
            this.rate = 2
        }else if(num >= 900){
            this.rate = 3
        }else if(num >= 800){
            this.rate = 4
        }else if(num >= 700){
            this.rate = 5
        }else if(num >= 600){
            this.rate = 6
        }else if(num >= 500){
            this.rate = 7
        }else if(num >= 400){
            this.rate = 8
        }else if(num >= 100){
            this.rate = 9
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
