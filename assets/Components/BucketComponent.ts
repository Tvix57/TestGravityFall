import { _decorator, Component, EventMouse, Input, input, instantiate, Label, Node, Prefab, tween, Tween, UIOpacity, Vec3 } from "cc";


const {ccclass, property} = _decorator;
@ccclass('BucketComponent')
export class BucketComponent extends Component {

    @property(Prefab)
    scorePopup: Prefab = null;

    private activePopups: Node[] = [];

    onEnable() {
        input.on(Input.EventType.MOUSE_MOVE, this.updatePosition, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_MOVE, this.updatePosition, this);
    }

    updatePosition(event: EventMouse) {
        this.node.setWorldPosition(event.getUILocationX(), this.node.getWorldPosition().y, 0);
    }

    public showScore(score: string) {
        let popup = instantiate(this.scorePopup);
        this.node.parent.addChild(popup);
        popup.setWorldPosition(this.node.worldPosition);
        popup.getComponent(Label).string = score;
        this.activePopups.push(popup);

        let opacity = popup.getComponent(UIOpacity);
        let startPos = popup.position.clone();
        let endPos = new Vec3(startPos.x, startPos.y + 50, startPos.z);

        tween(popup)
            .to(1, { position: endPos })
            .call(() => this.destroyPopup(popup))
            .start();

        tween(opacity)
            .set({ opacity: 255 })
            .to(1, { opacity: 0 })
            .start();
    }

    public clearScores(): void {
        for (let popup of this.activePopups.slice()) {
            Tween.stopAllByTarget(popup);
            Tween.stopAllByTarget(popup.getComponent(UIOpacity));
            this.destroyPopup(popup);
        }
    }

    private destroyPopup(popup: Node): void {
        let index = this.activePopups.indexOf(popup);
        if (index !== -1) {
            this.activePopups.splice(index, 1);
        }
        popup.destroy();
    }
}
