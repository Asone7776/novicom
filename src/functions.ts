import moment from "moment";
export const requiredPattern = {
    value: true,
    message: "Поле обязательно для заполнения"
};
export const emailPattern = {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Введите корректный e-mail'
}
export const formatPrice = (price: number | string) => {
    const n = String(price),
        p = n.indexOf('.');

    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m} ` : m
    );
};



export const formatDate = (date: string) => {
    let modifiedDate = moment(date).format('DD.MM.yyyy HH:mm');
    return modifiedDate;
}

export const debounce = (func: any, wait: number, immediate: boolean) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...rest: any) => {
        const context: any = this;


        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, rest);
        };

        const callNow = immediate && !timeout;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, rest);
    };
};

export const withDebounce = debounce((action: any) => {
    action();
}, 300, false);

export const getStatusName = (id: number) => {

    let statusName = '';
    switch (id) {
        case -1:
            statusName = 'Отменено';
            break;
        case 0:
            statusName = 'Не оплачено';
            break;
        case 2:
            statusName = 'Подтверждено';
            break;
        case 3:
            statusName = 'Оплачено';
            break;
        default:
            statusName = 'Сохранено';
            break;
    }
    return statusName;
}

export const base64ToArrayBuffer = (base64: string) => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const declOfNum = (n: number, text_forms: string[]) => {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}