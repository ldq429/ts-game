import { IPoint, Direction } from "./types";
import { gameConfig } from './gameConfig';
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";
/*
 * @Author: your name
 * @Date: 2020-05-30 07:14:13
 * @LastEditTime: 2020-06-01 17:37:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/TerisRule.ts
 */

/**
 * 类型推倒帮助函数
 * @param obj 
 */
function isPoint(obj: any): obj is IPoint {
    // 判断一个对象是否含有该属性 这种方式比较保险
    if (obj.x !== undefined) {
        return true;
    }
    return false;
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
    static canIMove(shape: IPoint[], targetPoint: IPoint, exists: Square[]): boolean {
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
        let resp = targetSquarePoint.some(point => {
            const conditionLeftRight = point.x < 0 || point.x > gameConfig.panelSize.width - 1;
            const conditionDown = point.y > gameConfig.panelSize.height - 1;
            const result = conditionLeftRight || conditionDown;
            return result;
        })
        // 如果 resp 为 ture 说明 有超出边界情况 ，不能移动 所以返回false
        if (resp) {
            return false;
        }
        // 是否与已有的方块重叠  如果有的话 则返回true,进而不不能够继续移动
        resp = targetSquarePoint.some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y));

        if (resp) {
            return false;
        }
        return true;

    }
    /**
     * 函数重载 两种情况
     * 利用枚举 在定义三个方向
     * @param teris 
     * @param targetPointORdirectoin 
     */
    static move(teris: SquareGroup, targetPointORdirectoin: IPoint, exists: Square[]): boolean;
    static move(teris: SquareGroup, targetPointORdirectoin: Direction, exists: Square[]): boolean;
    static move(teris: SquareGroup, targetPointORdirectoin: IPoint | Direction, exists: Square[]): boolean {
        if (isPoint(targetPointORdirectoin)) {
            const moveRes = this.canIMove(teris.shape, targetPointORdirectoin, exists);
            if (moveRes) {
                teris.pointCenter = targetPointORdirectoin;
                return true;
            }
            return false;
        }
        let targetPoint: IPoint;
        if (targetPointORdirectoin === Direction.left) {
            targetPoint = {
                ...teris.pointCenter,
                x: teris.pointCenter.x - 1
            }
        } else if (targetPointORdirectoin === Direction.right) {
            targetPoint = {
                ...teris.pointCenter,
                x: teris.pointCenter.x + 1
            }
        } else {
            targetPoint = {
                ...teris.pointCenter,
                y: teris.pointCenter.y + 1
            }
        }
        return this.move(teris, targetPoint, exists);
    }
    /**
     * 是否能够旋转，如果能够旋转，则旋转返回true，否则 返回false
     */
    static rotate(tries: SquareGroup, exists: Square[]): boolean {
        // 获得新形状
        const newShape = tries.afterRotateShape();
        if (this.canIMove(newShape, tries.pointCenter, exists)) {
            tries.route();
            return true;
        } else {
            return false;
        }
    }

    static fastDown(tries: SquareGroup, exists: Square[]) {
        while (this.move(tries, Direction.dwon, exists)) { }
    }
}

