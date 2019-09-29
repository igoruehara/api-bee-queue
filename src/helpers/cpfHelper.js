async function tratadorCpf(cpf) { 
  const cpfReplace = cpf.replace(/\D/g, '')
  return cpfReplace;
}

module.exports = { tratadorCpf };
