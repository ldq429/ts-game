/*
 * @Author: your name
 * @Date: 2020-05-29 08:34:15
 * @LastEditTime: 2020-06-02 15:49:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/Teris.ts
 */
import { IPoint } from "./types";
import { createRandom, createColor } from '../util';
import { SquareGroup } from "./SquareGroup";

export class TShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
            _pointCenter,
            _color
        )
    }
}

export class LShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
            _pointCenter,
            _color
        )
    }
}

export class TMirrorShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
            _pointCenter,
            _color
        )
    }
}

export class SShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
            _pointCenter,
            _color
        )
    }
    route() {
        super.route();
        this.isClock = !this.isClock;
    }
}

export class SMirrorShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            _pointCenter,
            _color
        )
    }
    route() {
        super.route();
        // 注意是改变 这个子类的 isclock 
        this.isClock = !this.isClock;
    }
}

export class SquareShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            _pointCenter,
            _color
        )
    }
    afterRotateShape(): IPoint[] {
        return this.shape;
    }
}

export class LineShape extends SquareGroup {
    constructor(
        _pointCenter: IPoint,
        _color: string
    ) {
        super(
            [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
            _pointCenter,
            _color
        )
    }
    route() {
        super.route();
        // 注意是改变 这个子类的 isclock 
        this.isClock = !this.isClock;
    }
}

const shapeArray = [
    TShape, LShape, TMirrorShape, SShape, SMirrorShape, SquareShape, LineShape
]
// const shapeArray = [
//     SquareShape
// ]


/**
 * 随机产生一个 俄罗斯方块（squareGroup）
 * @param centerPoint 
 */
export function createTeris(centerPoint: IPoint): SquareGroup {
    const index = createRandom(0, shapeArray.length);
    const color = createColor();
    const TempTeris = shapeArray[index];
    const Teris = new TempTeris(centerPoint, color);
    return Teris;
}