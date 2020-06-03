/*
 * @Author: your name
 * @Date: 2020-05-29 08:52:06
 * @LastEditTime: 2020-06-03 19:37:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-game/src/utils.ts
 */

/**
 * 根据最小值和最大值得到该范围内的随机数， 
 * 注意：无法渠道最大值
 * @param min 
 * @param max 
 */
export function createRandom(min: number, max: number): number {
    const dec = max - min;
    const random = Math.floor(Math.random() * dec + min);
    return random;
}

export function createColor(): string {
    const colorArray: string[] = [
        '#53868B', '#66CD00', '#CD5C5C', '#FF00FF', '#912CEE', '#008B8B'
    ]
    const index: number = createRandom(0, colorArray.length);
    return colorArray[index];
}