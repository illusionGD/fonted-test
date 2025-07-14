import { Application } from "pixi.js";
(async () => {
    const app = new Application();

    await app.init({ background: 0xffffff, resizeTo: window });

    document.getElementById("pixi-container")!.appendChild(app.canvas);
})();
