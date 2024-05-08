import { GameObj } from "kaboom";

loadSprite('bird', '/sprites/redbird-midflap.png');
loadSprite('bg', '/sprites/background-night.png')
loadSprite('pipe', '/sprites/pipe-red.png')

add([
	sprite("bg", { width: width(), height: height() })
])

setGravity(2000);

const player: GameObj = add([
	sprite('bird'),
	pos(80, 40),
	scale(1.5),
	area(),
	body(),
]);


add([
	sprite("pipe"),
	pos(width() - 200, 500),
]);

add([
	sprite("pipe", { flipY: true }),
	pos(width() - 200, 0),
]);



onClick(() => {
	player.jump();
})
