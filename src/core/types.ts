import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

/*
 * @Author: your name
 * @Date: 2020-05-26 10:10:44
 * @LastEditTime: 2020-06-03 10:23:31
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

export enum GameStatus {
    init, // 未开始
    playing, // 进行中
    pause, // 暂停
    gameOver // 游戏结束
}

export interface IGameView {
    /**
     * 显示下一个俄罗斯方块
     * @param nextTeris : 下一个俄罗斯方块
     */
    showNext(nextTeris: SquareGroup): void;
    /**
     * 切换的俄罗斯方块
     * @param currentTeris : 切换的当前的俄罗斯方块
     */
    switchShow(currentTeris: SquareGroup): void;
    // 初始化游戏
    init(game: Game): void;
    // 显示分数
    showScore(score: number): void;

    onGameStart(): void;
    onGamePuase(): void;
    onGameOver(): void;

}
