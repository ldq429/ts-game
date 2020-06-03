/*
 * @Author: your name
 * @Date: 2020-05-30 07:37:57
 * @LastEditTime: 2020-06-03 19:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/core/gameConfig.ts
 */

export const gameConfig = {
    /**
     * 左侧面板大小
     */
    panelSize: {
        width: 8,
        height: 16
    },
    /**
     * 右侧面板大小
     */
    nextTerisSize: {
        width: 6,
        height: 4
    },
    levels: [
        {
            score: 0,
            duration: 1500
        }, {
            score: 50,
            duration: 1200
        }, {
            score: 100,
            duration: 1000
        }, {
            score: 200,
            duration: 800
        }, {
            score: 300,
            duration: 600
        }, {
            score: 500,
            duration: 400
        }
    ]
}