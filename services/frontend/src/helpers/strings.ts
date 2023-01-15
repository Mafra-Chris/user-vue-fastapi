export function allEqual(input: string) {
  if (input.length === 0) return false
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

export function maskCPF(cpf: string) {
  let numCPF = cpf.replace(/[^\d]+/g, '');
  return numCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function maskPIS(pis: string) {
  let numPIS = pis.replace(/[^\d]+/g, '');
  return numPIS.replace(/^(\d{3})(\d{5})(\d{2})(\d{1})/, "$1.$2.$3-$4");
}

export function maskCEP(cep: string) {
  let numCEP = cep.replace(/[^\d]+/g, '');
  return numCEP.replace(/^(\d{5})(\d{3})/, "$1-$2");
}