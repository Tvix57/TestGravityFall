import { GameConfigs } from "./GameConfigs";
import { GameContext } from "./GameContext";

export class Root {
    private _gameContext: GameContext;
    private _config: GameConfigs;

    private static instance: Root;
    public static get Instance() {
        if (this.instance == null) {
            this.instance = new Root();
        }
        return this.instance;
    }

    public get gameContext(): GameContext {
        return this._gameContext;
    }

    public get config(): GameConfigs {
        return this._config;
    }

    public onLoad(gameContext: GameContext, config: JSON) {
        this._gameContext = gameContext;
        this._config = new GameConfigs(config);
    }
}