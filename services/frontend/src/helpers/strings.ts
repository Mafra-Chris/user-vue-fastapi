export function allEqual(input: string) {
  return input.split('').every(char => char === input[0]);
}

export function capitalizeFirstLetter(input: string) {
  const arr = input.split(" ");


  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }

  const capitalized = arr.join(" ");

  return capitalized
}