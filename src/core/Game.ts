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
 * @LastEditTime: 2020-06-03 07:12:16
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
    private _nextTeris!: SquareGroup;
    // 下落时间的定时器
    private _timer?: number;
    // 下落时间间隔
    private _duration: number = 1000;
    // 当前游戏中已经存在的方块
    private _exists: Square[] = [];

    private _score: number = 0;

    // 在构造函数中 使用显示
    constructor(private _gameView: IGameView) {
        _gameView.init(this);
        // 显示下一个方块
        this._createNext();
    }

    /**
     * 触底之后的操作
     */
    private _hitBottom(): void {
        // 1. 把当前的方块保存在数组 _this._exists中
        // this._exists.push(...this._currentTeris!.squareGroup);
        this._exists = this._exists.concat(this._currentTeris!.squareGroup);
        // 处理移除
        const num = TerisRule.deleteSquare(this._exists);
        this._addScore(num);
        console.log(num);
        // 2. 切换下一个方块
        this._switchTeris();
    }
    /**
     * 积分
     */
    private _addScore(num: number): void {
        switch (num) {
            case 1:
                this._score += 10
                break;
            case 2:
                this._score += 20
                break;
            case 3:
                this._score += 30
                break;
            case 4:
                this._score += 40
                break;
            default:
                return;
        }
    }
    // 自由落体
    private _freeFall(): void {
        // 如果 当前 _timer 有值 或者 游戏状态不是 playing时都 不进行下落
        if (this._timer || this._gemeStatus !== GameStatus.playing) {
            return;
        } else {
            this._timer = setInterval(() => {
                if (this._currentTeris) {
                    const res = TerisRule.move(this._currentTeris, Direction.dwon, this._exists);
                    if (!res) {
                        // 触底事件
                        this._hitBottom();
                    }
                }
            }, this._duration);
        }
    }

    /**
     * 公共代码
     */
    private _createNext(): void {
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this._resetCenterPoint(gameConfig.nextTerisSize.width, this._nextTeris);
        this._gameView.showNext(this._nextTeris);
    }

    private _init(): void {
        this._exists.forEach(sq => {
            sq.view!.remove();
        })
        this._exists = [];
        this._createNext();
        this._currentTeris = undefined;
        this._score = 0;
    }
    /**
     * 切换方块
     */
    private _switchTeris(): void {
        this._currentTeris = this._nextTeris;
        // 游戏结束处理
        const res = TerisRule.canIMove(this._currentTeris.shape, this._currentTeris.pointCenter, this._exists);
        this._resetCenterPoint(gameConfig.panelSize.width, this._currentTeris);
        if (!res) {
            // 游戏结束
            this._gemeStatus = GameStatus.gameOver;
            clearInterval(this._timer);
            this._timer = undefined;
            // 清除右侧的方块
            this._currentTeris!.squareGroup.forEach(sq => {
                sq.view!.remove();
            })
            return;
        }
        // 使用显示 并且切换显示
        this._createNext();
        this._gameView.switchShow(this._currentTeris);
    }
    /**
     * 重新设置中心点
     * @param width 
     * @param tries 
     */
    private _resetCenterPoint(width: number, teris: SquareGroup): void {

        const x = Math.ceil(width / 2);
        const y = 0;
        teris.pointCenter = { x, y };
        while (teris.squareGroup.some(sq => sq.point.y < 0)) {
            teris.pointCenter = {
                x: teris.pointCenter.x,
                y: teris.pointCenter.y + 1
            }
        }
    }

    /**
     * 游戏开始
     */
    start(): void {
        // 当前游戏状态已经是playing状态 那么 什么也不做 直接返回
        if (this._gemeStatus === GameStatus.playing) {
            return;
        }
        // 从游戏结束到游戏开始的状态
        if (this._gemeStatus === GameStatus.gameOver) {
            this._init();
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
    pause(): void {
        if (this._gemeStatus === GameStatus.playing) {
            this._gemeStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }
    /**
     * 方块向左移动
     */
    moveLeft(): void {
        if (this._gemeStatus === GameStatus.playing) {
            TerisRule.move(this._currentTeris!, Direction.left, this._exists);
        }

    }
    /**
     * 方块向右移动
     */
    moveRight(): void {
        if (this._gemeStatus === GameStatus.playing) {
            TerisRule.move(this._currentTeris!, Direction.right, this._exists);
        }
    }
    /**
     * 方块快速向下移动
     */
    moveDown(): void {
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
    rotate(): void {
        if (this._gemeStatus === GameStatus.playing) {
            TerisRule.rotate(this._currentTeris!, this._exists);
        }
    }
}