const snakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
console.log(snakeCase('SNAKE'));