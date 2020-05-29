import { IPoint, IView } from "./types";

/*
 * @Author: your name
 * @Date: 2020-05-26 10:06:01
 * @LastEditTime: 2020-05-27 14:43:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/Spuare.ts
 */
export class Square {

    private _view?: IView;

    constructor(
        private _point: IPoint,
        private _color: string
    ) { }

    get point() {
        return this._point;
    }

    set point(val) {
        this._point = val;

        // 显示小方块
        if (this._view) {
            this._view.show();
        }
    }

    get color() {
        return this._color;
    }

    set color(val) {
        this._color = val;
    }
    /**
     * 显示者的访问器
     */
    get view() {
        return this._view;
    }
    /**
     * 只要有显示者的话，手动调用一次显示
     */
    set view(val) {
        this._view = val;
        if (val) {
            val.show();
        }
    }
}