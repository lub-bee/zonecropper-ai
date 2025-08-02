export const generatePrompt = (lines) => {
  return [
    "Translate each zone faithfully in the given order. Do not reorganize or reword.",
    "",
    ...lines,
  ].join('\n');
};
