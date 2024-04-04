export function checkForSpecialCharacters(str) {
  // const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]\s/;
  const specialChars = /[`\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\;\':"\\\|\,\.\<\>\/\?\~]/;
  return specialChars.test(str);
}

export function checkForSpace(str) {
  const specialChars = /\s/;
  return specialChars.test(str);
}

// export default { checkForSpecialCharacters, checkForSpace };
