import { GameObj } from "kaboom";

loadSprite('bird', '/sprites/redbird-midflap.png');
loadSprite('bg', '/sprites/Background1.png')
loadSprite('pipe', '/sprites/pipe.png')
loadSprite('newbird', 'sprites/Bird2-4.png', {
	sliceX: 4,
	sliceY: 1,
	anims: {
		"mid": 2,
		"jump": { from: 1, to: 3, loop: true, speed: 4 }
	}
})


scene("game", () => {


	add([
		sprite("bg", { width: width(), height: height() })
	])

	const PIPE_GAP: number = 100;

	setGravity(2000);


	const player: GameObj = add([
		sprite('newbird', { anim: "mid" }),
		pos(80, 40),
		scale(3),
		area(),
		body(),
		"player",
	]);


	function producePipes() {
		const offset = rand(-75, 75);
		add([
			sprite("pipe"),
			scale(2),
			pos(width(), height() / 2 + offset + PIPE_GAP),
			area(),
			"pipe",
			offscreen({ destroy: true })
		]);

		add([
			sprite("pipe", { flipY: true }),
			scale(2),
			pos(width(), height() / 2 + offset - PIPE_GAP),
			anchor("botleft"),
			area(),
			"pipe",
			offscreen({ destroy: true })
		]);


	}

	loop(1.5, () => {
		producePipes();
	})


	onUpdate("pipe", (pipe: GameObj) => {
		pipe.move(-160, 0);
	});

	onCollide("pipe", "player", () => {
		go("gameover");
	})

	onUpdate("player", (player: GameObj) => {
		if (player.pos.y > height() + 30 || player.pos.y < -30) {
			go("gameover");
		}
	})



	onClick(() => {
		player.play("jump");
		player.jump(600);
	})


})

scene("gameover", () => {
	add([
		text("gameover!")
	])
	onKeyPress("space", () => {
		go("game");
	})
})

go("game");
