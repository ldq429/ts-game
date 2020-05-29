import { Square } from "./core/Square";
import { BroswerLog } from "./core/views/BroswerLog";
import { IPoint } from "./core/types";
import { SquareGroup } from "./core/SquareGroup";

/*
 * @Author: your name
 * @Date: 2020-05-24 09:35:32
 * @LastEditTime: 2020-05-28 21:10:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/index.js
 */
const squareGroup = new SquareGroup([
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 }
], { x: 2, y: 2 }, '#FF00FF');

squareGroup.squareGroup.forEach(sq => {
    const root: HTMLElement = document.getElementById('root') as HTMLElement;
    sq.view = new BroswerLog(sq, root);
})

let moveLeft: HTMLElement = document.getElementById('moveLeft') as HTMLElement;
let moveDown: HTMLElement = document.getElementById('moveDown') as HTMLElement;
let moveRight: HTMLElement = document.getElementById('moveRight') as HTMLElement;


moveLeft.addEventListener('click', function () {
    /**
     * 更改中心点坐标
     */
    squareGroup.pointCenter = {
        ...squareGroup.pointCenter,
        x: squareGroup.pointCenter.x - 1
    };

})

moveDown.addEventListener('click', function () {
    /**
     * 更改中心点坐标
     */
    squareGroup.pointCenter = {
        ...squareGroup.pointCenter,
        y: squareGroup.pointCenter.y + 1
    };

})

moveRight.addEventListener('click', function () {
    /**
     * 更改中心点坐标
     */
    squareGroup.pointCenter = {
        ...squareGroup.pointCenter,
        x: squareGroup.pointCenter.x + 1
    };

})











// const sq = new Square({ x: 0, y: 0 }, 'green');
// const root: HTMLElement = document.getElementById('root') as HTMLElement;

// const broswerLog = new BroswerLog(sq, root);
// sq.view = broswerLog;
// sq.view.show();


// let runDown: HTMLElement = document.getElementById('runDown') as HTMLElement;
// let clearSquare: HTMLElement = document.getElementById('clearSquare') as HTMLElement;
// let addSquare: HTMLElement = document.getElementById('addSquare') as HTMLElement;
// runDown.addEventListener('click', function () {
//     sq.point = {
//         ...sq.point,
//         y: sq.point.y + 1
//     }
// })

// clearSquare.addEventListener('click', function () {
//     if (sq.view) {
//         sq.view.remove();
//     }
// })

// addSquare.addEventListener('click', function () {
//     const container = document.getElementById('root') as HTMLElement;
//     sq.view = new BroswerLog(sq, container);
// })

