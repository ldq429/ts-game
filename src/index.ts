/*
 * @Author: your name
 * @Date: 2020-05-24 09:35:32
 * @LastEditTime: 2020-06-01 10:32:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/index.ts
 */
import { Game } from "./core/Game";
import { GameView } from './core/views/GameView';
const viewer = new GameView();
const g = new Game(viewer);

const satrt = document.getElementById('start')!;
const pause = document.getElementById('pause')!;
const left = document.getElementById('moveLeft')!;
const right = document.getElementById('moveRight')!;
const down = document.getElementById('moveDown')!;
const rotate = document.getElementById('rotate')!;
satrt.addEventListener('click', function () {
    g.start();
})
pause.addEventListener('click', function () {
    g.pause();
})
left.addEventListener('click', function () {
    g.moveLeft();
})
right.addEventListener('click', function () {
    g.moveRight();
})
down.addEventListener('click', function () {
    g.moveDown();
})
rotate.addEventListener('click', function () {
    g.rotate();
})

