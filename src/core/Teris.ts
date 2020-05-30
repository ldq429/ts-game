/*
 * @Author: your name
 * @Date: 2020-05-29 08:34:15
 * @LastEditTime: 2020-05-30 09:17:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/Teris.ts
 */
import { IPoint } from "./types";
import { createRandom, createColor } from '../util';
import { SquareGroup } from "./SquareGroup";

export const TShape: IPoint[] = [
    { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }
]

export const LShape: IPoint[] = [
    { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
]

export const TMirrorShape: IPoint[] = [
    { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
]

export const SShape: IPoint[] = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }
]

export const SMirrorShape: IPoint[] = [
    { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
]

export const SquareShape: IPoint[] = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
]

export const LineShape: IPoint[] = [
    { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
]

const shapeArray = [
    TShape, LShape, TMirrorShape, SShape, SMirrorShape, SquareShape, LineShape
]


/**
 * 随机产生一个 俄罗斯方块（squareGroup）
 * @param centerPoint 
 */
export function createSquareGroup(centerPoint: IPoint): SquareGroup {
    const index = createRandom(0, shapeArray.length);
    const color = createColor();
    const shape = shapeArray[index];
    const squareGroup = new SquareGroup(shape, centerPoint, color);
    return squareGroup;
}