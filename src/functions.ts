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