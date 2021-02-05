export const getLanguage = () => {
    let language;
    let defualtLanguage = 'zh';
    // let language = window.hilink.getAppLanguage();
    let reg = /^zh-/i;
    if (navigator && navigator.language) {
        language = reg.test(navigator.language) ? defualtLanguage : 'en';
    } else {
        language = defualtLanguage;
    }
    return language;
};

export const format = (date, fmt) => {
    let ret;
    let o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'W+': date.getDay()
    };
    for (let k in o) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            let str = o[k].toString();
            let len = ret[1].length;
            if (len !== 1 && len > str.length) {
                str = addZero(str, len - str.length);
            }
            fmt = fmt.replace(ret[1], str);
        };
    };
    return fmt;
};
const addZero = (str, len) => {
    return `${new Array(len).fill(0).join('')}${str}`;
};
