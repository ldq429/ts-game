/*
 * @Author: your name
 * @Date: 2020-05-29 08:52:06
 * @LastEditTime: 2020-05-29 09:15:58
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
        '#FF79BC', '#BE77FF', '#79FF79', '#79FF79', '#FFFF93', '#81C0C0'
    ]
    const index: number = createRandom(0, colorArray.length);
    return colorArray[index];
}