import { Square } from "./core/Square";
import { BroswerLog } from "./core/views/BroswerLog";
import { IPoint, Direction } from "./core/types";
import { createSquareGroup } from './core/Teris';
import { TerisRule } from './core/TerisRule';
import { IpcNetConnectOpts } from "net";
/*
 * @Author: your name
 * @Date: 2020-05-24 09:35:32
 * @LastEditTime: 2020-05-30 16:51:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/index.js
 */
const squareGroup = createSquareGroup({ x: 3, y: 3 });

squareGroup.squareGroup.forEach(sq => {
    const root: HTMLElement = document.getElementById('root') as HTMLElement;
    sq.view = new BroswerLog(sq, root);
})

/**
 * 获取dom元素 进而监听
 */
const moveLeft: HTMLElement = document.getElementById('moveLeft') as HTMLElement;
const moveDown: HTMLElement = document.getElementById('moveDown') as HTMLElement;
const moveRight: HTMLElement = document.getElementById('moveRight') as HTMLElement;
const rotate: HTMLElement = document.getElementById('rotate') as HTMLElement;

rotate.addEventListener('click', function () {
    TerisRule.rotate(squareGroup);
})

moveLeft.addEventListener('click', function () {
    /**
     * 更改中心点坐标
     */

    // 下一个目标中心点
    // const targetPoint: IPoint = {
    //     ...squareGroup.pointCenter,
    //     x: squareGroup.pointCenter.x - 1
    // };
    // TerisRule.move(squareGroup, targetPoint);
    TerisRule.move(squareGroup, Direction.left);
})

moveRight.addEventListener('click', function () {
    /**
     * 更改中心点坐标
     */
    // const targetPoint: IPoint = {
    //     ...squareGroup.pointCenter,
    //     x: squareGroup.pointCenter.x + 1
    // };
    // TerisRule.move(squareGroup, targetPoint);
    TerisRule.move(squareGroup, Direction.right);
})

moveDown.addEventListener('click', function () {
    /**
     * 更改中心点坐标
     */
    // const targetPoint: IPoint = {
    //     ...squareGroup.pointCenter,
    //     y: squareGroup.pointCenter.y + 1
    // };

    // TerisRule.move(squareGroup, targetPoint);
    TerisRule.move(squareGroup, Direction.dwon);
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

