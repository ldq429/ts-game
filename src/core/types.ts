/*
 * @Author: your name
 * @Date: 2020-05-26 10:10:44
 * @LastEditTime: 2020-05-30 09:52:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/types.ts
 */

/**
 * 关于小方块的坐标
 */
export interface IPoint {
    readonly x: number;
    readonly y: number;
}

export interface IView {
    show(): void;
    remove(): void;
}

export enum Direction {
    left,
    right,
    dwon
}
