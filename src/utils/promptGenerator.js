export const generatePrompt = (lines) => {
  return [
    "Merci de traduire fidèlement chaque zone dans l'ordre indiqué, sans réorganiser ni reformuler.",
    "",
    ...lines,
  ].join('\n');
};
