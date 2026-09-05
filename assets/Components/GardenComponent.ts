import { _decorator, Collider2D, Component, Label, Prefab, instantiate, Contact2DType, IPhysics2DContact, NodePool, Node, BoxCollider2D, Widget, random, randomRange, randomRangeInt, RigidBody2D, Vec2 } from "cc";
import { GardenController } from "../scipts/GardenConroller";
import { Root } from "../scipts/Root";
import { FruitComponent } from "./FruitComponents";


const {ccclass, property} = _decorator;
@ccclass('GardenComponent')
export class GardenComponent extends Component {
    @property(Node)
    ceil: Node = null

    @property(Collider2D)
    floor: Collider2D = null

    @property(Prefab)
    fruit: Prefab = null

    @property(Label)
    scoreText: Label

    @property(Label)
    timeText: Label
    
    @property(Node)
    bucket: Node

    private controller: GardenController;
    private pool: NodePool = new NodePool();
    
    protected onLoad(): void {
        this.floor.on(Contact2DType.BEGIN_CONTACT, this.onBeginFloorContact, this);
        this.bucket.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginBucketContact, this);
    }
    
    protected onEnable(): void {
        this.controller = new GardenController(Root.Instance.gameContext.garden);
        this.scoreText.string = this.controller.getScore().toString();
        this.schedule(this.createRandomFruit, 1);
    }

    protected onDisable(): void {
        this.floor.off(Contact2DType.BEGIN_CONTACT, this.onBeginFloorContact, this);
        this.bucket.getComponent(BoxCollider2D).off(Contact2DType.BEGIN_CONTACT, this.onBeginBucketContact, this);
        this.unschedule(this.createRandomFruit);
    }

    private createRandomFruit() {
        let node = this.pool.size() > 0 ? this.pool.get() : instantiate(this.fruit);
        
        node.getComponent(FruitComponent).controller = this.controller.createRandomFruit();

        let widget = node.getComponent(Widget);
        node.getComponent(RigidBody2D).linearVelocity = new Vec2(0,0)
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
        this.scoreText.string = this.controller.getScore().toString();
        // fruit.showScore(() => {this.removeFruit(other.node);})
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