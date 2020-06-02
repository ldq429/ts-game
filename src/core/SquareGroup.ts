import { IPoint } from "./types";
import { Square } from "./Square";

/*
 * @Author: your name
 * @Date: 2020-05-28 19:24:54
 * @LastEditTime: 2020-06-02 16:01:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/SquareGroup.ts
 */
export class SquareGroup {
    /**
     * 由于该数组是构造函数接受三个参数产生的数组，即是该类的变量
     * 所以该数组卸载狗仔函数外
     */
    private _squareGroup: ReadonlyArray<Square>;

    get squareGroup() {
        return this._squareGroup;
    }

    get pointCenter() {
        return this._pointCenter;
    }

    /**
     * 中心点的访问器设置
     * 1.设置中心点坐标
     * 2.设置整体的组小方块的移动
     */
    set pointCenter(point: IPoint) {
        this._pointCenter = point;
        /**
         * 访问器被访问说明 中心点在改变
         * 设置整体组的相对移动,设置小方块的新位置
         */
        this.setSquareOpint();
    }

    get shape() {
        return this._shape;
    }

    // true , false  顺时针 ，逆时针
    protected isClock = true;

    /**
     * 旋转之后的得到新的形状
     */
    afterRotateShape(): IPoint[] {
        if (this.isClock) {
            return this._shape.map(point => {
                return {
                    x: -point.y,
                    y: point.x
                }
            })
        } else {
            return this._shape.map(point => {
                return {
                    x: point.y,
                    y: -point.x
                }
            })
        }
    }
    /**
     * 旋转方法
     */
    route() {
        this._shape = this.afterRotateShape();
        this.setSquareOpint();
    }
    /**
     * 根据中心点坐标，形状， 设置方块的坐标
     */
    private setSquareOpint() {
        this._shape.forEach((p, i) => {
            this._squareGroup[i].point = {
                x: p.x + this._pointCenter.x,
                y: p.y + this._pointCenter.y
            };
        })
    }
    constructor(
        /**
         * 方块组合的形状
         */
        private _shape: IPoint[],

        /**
         * 中心点坐标，
         */
        private _pointCenter: IPoint,

        /**
         * 方块的颜色
         */
        private _color: string
    ) {
        const sqArr: Square[] = [];
        this._shape.forEach(point => {
            const sq = new Square(
                {
                    x: point.x + this._pointCenter.x,
                    y: point.y + this._pointCenter.y
                },
                this._color
            );
            sqArr.push(sq);
        })
        this._squareGroup = sqArr;
    }
}