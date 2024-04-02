class Play extends Phaser.Scene {

    constructor() {
        super({
            key: `play`
        });
    }

    // called once to initalize
    create() {
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };

        let gameDescription = `Think of a number....wrong!`;
        this.add.text(100, 100, gameDescription, style);
    }

    //called every frame
    update() {

    }
}