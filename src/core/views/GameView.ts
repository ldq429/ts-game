/*
 * @Author: your name
 * @Date: 2020-05-31 17:33:17
 * @LastEditTime: 2020-06-03 18:57:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/views/GameView.ts
 */
import { IGameView, IPoint, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { BroswerLog } from "./BroswerLog";
import { gameConfig } from "../gameConfig";
import pointConfig from "./pointConfig";

export class GameView implements IGameView {

    private _nextDom: HTMLElement = document.getElementById('nextSq')!;
    private _panel: HTMLElement = document.getElementById('panel')!;
    private _score: HTMLElement = document.getElementById('score')!;
    private boxMsg: HTMLElement = document.getElementById('msgBox')!;
    private msg: HTMLElement = document.getElementById('msg')!;
    /**
     * 初始化游戏
     * @param game 
     */
    init(game: import("../Game").Game): void {
        // 1.设置尺寸
        this._panel.style.width = gameConfig.panelSize.width * pointConfig.squareSize.width + 'px';
        this._panel.style.height = gameConfig.panelSize.height * pointConfig.squareSize.height + 'px';

        this._nextDom.style.width = gameConfig.nextTerisSize.width * pointConfig.squareSize.width + 'px';
        this._nextDom.style.height = gameConfig.nextTerisSize.height * pointConfig.squareSize.height + 'px';
        // 2. 注册键盘事件
        document.onkeydown = function (e) {
            const key: number = e.keyCode;
            switch (key) {
                case 32:// 空格键
                    if (game.gemeStatus === GameStatus.playing) {
                        game.pause();
                    } else {
                        game.start();
                    }
                    break;
                case 37:// 左
                    game.moveLeft();
                    break;
                case 38:// 上
                    game.rotate();
                    break;
                case 39:// 右
                    game.moveRight()
                    break;
                case 40:// 下
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

    showScore(score: number): void {
        this._score.innerHTML = score.toString();
    }

    onGameStart(): void {
        this.boxMsg.style.zIndex = '-1';
    }

    onGamePuase(): void {
        this.boxMsg.style.zIndex = '9';
        this.msg!.innerText = '游戏暂停';
    }

    onGameOver(): void {
        this.boxMsg.style.zIndex = '9';
        this.msg!.innerText = '游戏结束';
    }
}