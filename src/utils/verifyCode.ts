const generatedCodes = new Set();

export const generateUniqueCode = () => {
  let code;
  do {
    code = Math.random().toString(36).substring(7).toUpperCase();
  } while (generatedCodes.has(code));

  generatedCodes.add(code);

  return code;
};
