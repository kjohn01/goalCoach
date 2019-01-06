import moment from 'moment';

export const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};

export const isValidDate = (dueDate) => {
    const time = new Date(dueDate);
    return moment(time).isValid && moment(time).isAfter();
};

export const isNonEmptyString = (str) => {
    const regex = /^\s*$/;
    return isString(str) && !regex.test(str);
};
