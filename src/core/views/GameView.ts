/*
 * @Author: your name
 * @Date: 2020-05-31 17:33:17
 * @LastEditTime: 2020-06-01 09:39:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/views/GameView.ts
 */
import { IGameView, IPoint } from "../types";
import { SquareGroup } from "../SquareGroup";
import { BroswerLog } from "./BroswerLog";

export class GameView implements IGameView {
    showNext(nextTeris: SquareGroup): void {
        nextTeris.squareGroup.forEach(sq => {
            const nextSq = document.getElementById('nextSq') as HTMLElement;
            sq.view = new BroswerLog(sq, nextSq);
        })
    }

    switchShow(currentTeris: SquareGroup): void {
        currentTeris.squareGroup.forEach(sq => {
            sq.view!.remove();
            const panel = document.getElementById('panel') as HTMLElement;
            sq.view = new BroswerLog(sq, panel);
        })
    }
}