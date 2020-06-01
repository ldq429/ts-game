import { GameStatus, Direction, IGameView } from "./types";
import { createTeris } from './Teris';
import { SquareGroup } from "./SquareGroup";
import { TerisRule } from "./TerisRule";
import pointConfig from "./views/pointConfig";
import { gameConfig } from "./gameConfig";
import { Square } from "./Square";

/*
 * @Author: your name
 * @Date: 2020-05-31 07:16:01
 * @LastEditTime: 2020-06-01 17:31:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/Game.ts
 */
export class Game {
    // 当前的游戏状态
    private _gemeStatus: GameStatus = GameStatus.init;
    // 当前的俄罗斯方块， 有可能不存在
    private _currentTeris?: SquareGroup;
    // 下一个要显示的俄罗斯方块
    private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
    private _timer?: number;
    private _duration: number = 1000;
    private _exists: Square[] = [];

    // 在构造函数中 使用显示
    constructor(private _gameView: IGameView) {
        // 显示下一个方块
        this._resetCenterPoint(gameConfig.nextTerisSize.width, this._nextTeris);
        this._gameView.showNext(this._nextTeris);
    }
    /**
     * 游戏开始
     */
    start() {
        // 当前游戏状态已经是playing状态 那么 什么也不做 直接返回
        if (this._gemeStatus === GameStatus.playing) {
            return;
        }
        // 把当前状态赋值为游戏状态
        this._gemeStatus = GameStatus.playing;
        // 如果当前方块不存在则把下一个方块的值给当前方块
        if (!this._currentTeris) {
            this._switchTeris();
        }
        // 自由下落
        this._freeFall();
    }
    /**
     * 游戏暂停
     */
    pause() {
        if (this._gemeStatus === GameStatus.playing) {
            this._gemeStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }
    /**
     * 方块向左移动
     */
    moveLeft() {
        if (this._gemeStatus === GameStatus.playing) {
            TerisRule.move(this._currentTeris!, Direction.left, this._exists);
        }

    }
    /**
     * 方块向右移动
     */
    moveRight() {
        if (this._gemeStatus === GameStatus.playing) {
            TerisRule.move(this._currentTeris!, Direction.right, this._exists);
        }
    }
    /**
     * 方块快速向下移动
     */
    moveDown() {
        if (this._gemeStatus === GameStatus.playing) {
            TerisRule.fastDown(this._currentTeris!, this._exists);
            // TerisRule.move(this._currentTeris!, Direction.dwon);
            // 触底事件
            this._hitBottom();
        }
    }
    /**
     * 旋转方块
     */
    rotate() {
        if (this._gemeStatus === GameStatus.playing) {
            this._currentTeris!.route();
        }
    }
    /**
     * 触底之后的操作
     */
    private _hitBottom() {
        // 1. 把当前的方块保存在数组 _this._exists中
        this._exists.push(...this._currentTeris!.squareGroup);
        // 2. 切换下一个方块
        this._switchTeris();
    }
    // 自由落体
    private _freeFall() {
        // 如果 当前 _timer 有值 或者 游戏状态不是 playing时都 不进行下落
        if (this._timer || this._gemeStatus !== GameStatus.playing) {
            return;
        } else {
            this._timer = setInterval(() => {
                if (this._currentTeris) {
                    const res = TerisRule.move(this._currentTeris, Direction.dwon, this._exists);
                    if (!res) {
                        // 触底事件
                        this._hitBottom()
                    }
                }
            }, this._duration);
        }
    }
    /**
     * 切换方块
     */
    private _switchTeris() {
        this._currentTeris = this._nextTeris;

        this._nextTeris = createTeris({ x: 0, y: 0 });

        // 使用显示 并且切换显示
        this._resetCenterPoint(gameConfig.panelSize.width, this._currentTeris);
        this._gameView.switchShow(this._currentTeris);
        this._resetCenterPoint(gameConfig.nextTerisSize.width, this._nextTeris);
        this._gameView.showNext(this._nextTeris);
    }
    /**
     * 重新设置中心点
     * @param width 
     * @param tries 
     */
    private _resetCenterPoint(width: number, tries: SquareGroup): void {

        const x = Math.ceil(width / 2);
        const y = 0;
        tries.pointCenter = { x, y };
        while (tries.squareGroup.some(sq => sq.point.y < 0)) {
            tries.squareGroup.forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
        }
    }
}