const HEIGHT = 40 
const INSTANCE = 30
enum STATUS{SHOW=0,HIDE=1} 
var  a = {
    chooseThenextusefulOne(num?:STATUS){
        let _node:cc.Node = cc.find('Canvas/bg');
        for(let item of _node.children){
            if(item.getComponent('bgnode').status === num){
                    for(let i=1,j=item.children.length;i<j;i++){
                        let one = item.children[i];
                        let _posi:cc.Vec2 = _node.parent.convertToNodeSpaceAR(item.convertToWorldSpaceAR(cc.v2(one.x,one.y+HEIGHT)))
                        if(this._isSafe(_posi.y,one)){
                          let __node =   cc.find('Canvas/mover');
                          __node.getComponent('mover').removeMine(_posi)
                          __node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                          __node.active = true
                            return
                        }
                    }
                 if(num !== STATUS.HIDE)this.chooseThenextusefulOne(STATUS.HIDE);
            }
        }
    },
    _isSafe(y,node){
       return y + INSTANCE < node.parent.height/2-10
    }
}
export default a