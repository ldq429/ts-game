import { IPoint, Direction } from "./types";
import { gameConfig } from './gameConfig';
import { SquareGroup } from "./SquareGroup";
/*
 * @Author: your name
 * @Date: 2020-05-30 07:14:13
 * @LastEditTime: 2020-05-30 10:33:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/TerisRule.ts
 */

/**
 * 类型推倒帮助函数
 * @param obj 
 */
function isPoint(obj: any): obj is IPoint {
    return obj.x;
}

/**
 * 该类导出一系列规格
 * 根据游戏规则判断各种情况
 */
export class TerisRule {
    /**
     * 边界判断是都能够移动到目标位置
     * @param shape 形状
     * @param targetPoint 目标中心点，下一次将要移动的中心点位置
     */
    static canIMove(shape: IPoint[], targetPoint: IPoint): boolean {
        /**
         * 左右下边界的约束
         */

        // 获取目标的 方块组的坐标
        const targetSquarePoint: IPoint[] = shape.map(point => ({
            x: point.x + targetPoint.x,
            y: point.y + targetPoint.y
        }))

        /**
         * some 满足条件返回ture
         * 左右 下 判断是否超出边界， 如果 没有超出边界则返回false
         */
        const resp = targetSquarePoint.some(point => {
            const conditionLeftRight = point.x < 0 || point.x > gameConfig.panelSize.width - 1;
            const conditionDown = point.y > gameConfig.panelSize.height - 1;
            const result = conditionLeftRight || conditionDown;
            return result;
        })
        // 如果 resp 为 ture 说明 有超出边界情况 ，不能移动 所以返回false
        if (resp) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * 函数重载 两种情况
     * 利用枚举 在定义三个方向
     * @param squareGroup 
     * @param targetPointORdirectoin 
     */
    static move(squareGroup: SquareGroup, targetPointORdirectoin: IPoint): boolean;
    static move(squareGroup: SquareGroup, targetPointORdirectoin: Direction): boolean;
    static move(squareGroup: SquareGroup, targetPointORdirectoin: IPoint | Direction): boolean {
        if (isPoint(targetPointORdirectoin)) {
            const moveRes = TerisRule.canIMove(squareGroup.shape, targetPointORdirectoin);
            if (moveRes) {
                squareGroup.pointCenter = targetPointORdirectoin;
                return true
            }
            return false;
        } else {
            let targetPoint: IPoint;

            if (targetPointORdirectoin === Direction.left) {
                targetPoint = {
                    ...squareGroup.pointCenter,
                    x: squareGroup.pointCenter.x - 1
                }
            } else if (targetPointORdirectoin === Direction.right) {
                targetPoint = {
                    ...squareGroup.pointCenter,
                    x: squareGroup.pointCenter.x + 1
                }
            } else {
                targetPoint = {
                    ...squareGroup.pointCenter,
                    y: squareGroup.pointCenter.y + 1
                }
            }
            return this.move(squareGroup, targetPoint);
        }
    }
}

