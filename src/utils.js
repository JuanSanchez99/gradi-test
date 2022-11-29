export const formatNumber = (number, multiply=1) => {
    let value = parseInt(number) * parseInt(multiply)
    return `$ ${value.toFixed(2)}`
};