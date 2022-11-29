export const formatNumber = (number, multiply=1) => {
    let value = parseInt(number) * multiply
    return `$ ${value.toFixed(2)}`
};