import { _decorator, Component, EventMouse, Input, input } from "cc";


const {ccclass, property} = _decorator;
@ccclass('BucketComponent')
export class BucketComponent extends Component {

    onEnable() {
        input.on(Input.EventType.MOUSE_MOVE, this.updatePosition, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_MOVE, this.updatePosition, this);
    }

    updatePosition(event: EventMouse) {
        this.node.setWorldPosition(event.getUILocationX(), this.node.getWorldPosition().y, 0);
    }
    
}