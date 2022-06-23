/**
 * 将时间与当前时间比较算出差值
 * @param time 
 */
export function timeToDay(time: string): string {
    const date = new Date(time).getTime();
    const now = new Date().getTime();
    const diff = now - date;
    if (diff <= 2 * 60 * 60 * 1000) {
        return '不久前';
    } else {
        // 算差距天数
        const day = 24 * 60 * 60 * 1000;
        const diffDay = parseInt(`${diff / day}`);;
        if (diffDay <= 30) {
            return `${diffDay}天前`;
        } else if (diffDay <= 365) {
            return `${parseInt(`${diffDay / 30}`)}月前`;
        } else {
            return `${parseInt(`${diffDay / 365}`)}年前`;
        }
    }
}

/**
 * 判断当前时间为白天还是夜晚
 */
export function judgeDayOrNight(): boolean {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour <= 18) {
        return false;
    } else {
        return true;
    }
}