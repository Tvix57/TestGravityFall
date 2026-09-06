import { _decorator, Collider2D, Component, Prefab, instantiate, Contact2DType, IPhysics2DContact, NodePool, Node, BoxCollider2D, Widget, random, randomRange, randomRangeInt, RigidBody2D, Vec2 } from "cc";
import { GardenController } from "../scipts/GardenConroller";
import { BucketComponent } from "./BucketComponent";
import { FruitComponent } from "./FruitComponents";
import { StopDialogComponent } from "./StopDialogComponent";

const {ccclass, property} = _decorator;
@ccclass('GardenComponent')
export class GardenComponent extends Component {
    @property(Node)
    ceil: Node = null

    @property(Collider2D)
    floor: Collider2D = null

    @property(Prefab)
    fruit: Prefab = null

    @property(Node)
    bucket: Node

    @property(Prefab)
    stopDialog: Prefab = null

    private controller: GardenController;
    private pool: NodePool = new NodePool();
    private stopDialogComponent: StopDialogComponent;

    protected onLoad(): void {
        this.floor.on(Contact2DType.BEGIN_CONTACT, this.onBeginFloorContact, this);
        this.bucket.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginBucketContact, this);

        let dialogNode = instantiate(this.stopDialog);
        this.node.addChild(dialogNode);
        this.stopDialogComponent = dialogNode.getComponent(StopDialogComponent);
        this.stopDialogComponent.showStart();
    }

    protected onEnable(): void {
        this.controller = new GardenController(this);
    }

    protected onDisable(): void {
        this.floor.off(Contact2DType.BEGIN_CONTACT, this.onBeginFloorContact, this);
        this.bucket.getComponent(BoxCollider2D).off(Contact2DType.BEGIN_CONTACT, this.onBeginBucketContact, this);
        this.controller.pauseTimer();
        this.controller.dispose();
    }

    public beginRound(): void {
        this.controller.resumeTimer();
    }

    public endRound(): void {
        this.clearFruits();
        this.bucket.getComponent(BucketComponent).clearScores();
        this.controller.pauseTimer();
        this.stopDialogComponent.showRestart();
    }

    private clearFruits(): void {
        for (let node of this.ceil.children.slice()) {
            if (node.getComponent(FruitComponent)) {
                this.pool.put(node);
            }
        }
    }

    public spawnFruit(): void {
        let node = this.pool.size() > 0 ? this.pool.get() : instantiate(this.fruit);

        let fruitController = this.controller.createRandomFruit();
        node.getComponent(FruitComponent).controller = fruitController;

        let widget = node.getComponent(Widget);
        let rigidBody = node.getComponent(RigidBody2D);
        rigidBody.linearVelocity = new Vec2(0,0)
        rigidBody.gravityScale = fruitController.acceleration;
        this.ceil.addChild(node);
        widget.horizontalCenter = randomRange(-0.5, 0.5);
        widget.verticalCenter = randomRange(-0.4, 0.4);
    }

    onBeginFloorContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        this.removeFruit(other.node);
    }

    onBeginBucketContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        let fruit = other.node.getComponent(FruitComponent)
        this.controller.catchFruit(fruit.controller.id);
        this.bucket.getComponent(BucketComponent).showScore(fruit.controller.score);
        this.removeFruit(other.node);
    }

    removeFruit(fruit: Node) {
        this.scheduleOnce(() => {
            if(fruit.isValid) {
                this.pool.put(fruit)
            }
        }, 0)
    }
}
