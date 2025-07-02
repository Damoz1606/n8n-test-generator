export const sumArray = (values: number[]): number =>
    values.reduce((acc, cur) => acc + cur, 0);

export const filterEvenNumbers = (values: number[]): number[] =>
    values.filter(value => value % 2 === 0);

export const factorial = (n: number) => {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}