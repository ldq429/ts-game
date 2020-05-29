import { IView } from "../types";
import { Square } from "../Square";
import pointConfig from "./pointConfig";

/*
 * @Author: lu
 * @Date: 2020-05-27 09:34:10
 * @LastEditTime: 2020-05-27 11:20:56
 * @LastEditors: Please set LastEditors
 * @Description: 用于显示小方块到浏览器上
 * @FilePath: /ts-game/src/core/BroswerLog.ts
 */

export class BroswerLog implements IView {

    private dom?: HTMLElement;
    /**
     * false: 存在， true：已经移除
     */
    private isRemove?: boolean = false;
    constructor(
        private square: Square,
        private container: HTMLElement,
    ) { }
    /**
     * 显示方块
     */
    show(): void {
        /**
         * 如果已经移除了方块，则不做任何显示
         */
        if (this.isRemove) {
            return;
        }
        /**
         * 创建dom对象不变的属性
         */
        if (!this.dom) {
            this.dom = document.createElement('div');
            this.dom.style.position = 'absolute';
            this.dom.style.width = pointConfig.squareSize.width + 'px';
            this.dom.style.height = pointConfig.squareSize.height + 'px';
            this.dom.style.border = "1px solid #ccc";
            this.dom.style.boxSizing = "border-box";
        }
        /**
         * 添加到conatiner的容器中
         */
        this.container.appendChild(this.dom);
        /**
         * 这里的point的x，y是逻辑坐标，需要经过换算得到真实的坐标
         */
        this.dom.style.left = this.square.point.x * pointConfig.squareSize.width + 'px';
        this.dom.style.top = this.square.point.y * pointConfig.squareSize.height + 'px';
        this.dom.style.backgroundColor = this.square.color;

    }
    /**
     * 移除方块
     */
    remove(): void {
        if (this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
}