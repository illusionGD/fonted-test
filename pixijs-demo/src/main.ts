import { Application, Assets, NineSlicePlane, Sprite, Texture } from "pixi.js";
import { initAssets } from "./scripts/core/assetsManager";
(async () => {
    const app = new Application();

    await app.init({ background: 0xffffff, resizeTo: window });
    await initAssets()
    setTimeout(() => {
         Assets.load('game/game-atlas/books-01.png').then(res => {
            console.log("🚀 ~ skeleton ~ res:", res)
        });        
    }, 2000)
    document.getElementById("pixi-container")!.appendChild(app.canvas);
})();
