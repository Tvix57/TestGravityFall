import { _decorator, director, Component, JsonAsset } from "cc";
import { Root } from "./Root";
import { GameContext } from "./GameContext";

const {ccclass, uniquelyReferenced, property} = _decorator;

@ccclass('RootComponent')
@uniquelyReferenced
export class RootComponent extends Component {

    @property(JsonAsset) 
    public config: JsonAsset = null;


    protected onLoad(): void {
        director.addPersistRootNode(this.node);

        Root.Instance.onLoad(new GameContext(), this.config.json as JSON);
    }
}