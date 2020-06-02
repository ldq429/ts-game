/*
 * @Author: your name
 * @Date: 2020-05-31 17:33:17
 * @LastEditTime: 2020-06-02 11:59:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/views/GameView.ts
 */
import { IGameView, IPoint } from "../types";
import { SquareGroup } from "../SquareGroup";
import { BroswerLog } from "./BroswerLog";
import { gameConfig } from "../gameConfig";
import pointConfig from "./pointConfig";

export class GameView implements IGameView {
    private _nextDom: HTMLElement = document.getElementById('nextSq')!;
    private _panel: HTMLElement = document.getElementById('panel')!;
    init(game: import("../Game").Game): void {
        // 1.设置尺寸
        this._panel.style.width = gameConfig.panelSize.width * pointConfig.squareSize.width + 'px';
        this._panel.style.height = gameConfig.panelSize.height * pointConfig.squareSize.height + 'px';

        this._nextDom.style.width = gameConfig.nextTerisSize.width * pointConfig.squareSize.width + 'px';
        this._nextDom.style.height = gameConfig.nextTerisSize.height * pointConfig.squareSize.height + 'px';
        // 2. 注册键盘事件
        document.onkeydown = function (e) {
            const key: number = e.keyCode
            console.log(key);
            switch (key) {
                case 32:// 空格键
                    console.log('空格键');
                    game.rotate();
                    break;
                case 37:// 左
                    console.log('左');
                    game.moveLeft();
                    break;
                case 39:// 右
                    console.log('右');
                    game.moveRight()
                    break;
                case 40:// 下
                    console.log('下');
                    game.moveDown();
                    break;
            }
        }

    }
    showNext(nextTeris: SquareGroup): void {
        nextTeris.squareGroup.forEach(sq => {
            sq.view = new BroswerLog(sq, this._nextDom);
        })
    }

    switchShow(currentTeris: SquareGroup): void {
        currentTeris.squareGroup.forEach(sq => {
            sq.view!.remove();
            sq.view = new BroswerLog(sq, this._panel);
        })
    }

}