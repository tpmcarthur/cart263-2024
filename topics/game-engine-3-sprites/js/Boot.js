//Scene that boots up the game
class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    }

    create() {
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };

        let loadingString = `Loading.....`;
        this.add.text(100, 100, loadingString, style);

        //define which scene we want to start first (key name in play.js)
        this.scene.start(`play`);
    }

    update() {

    }
}