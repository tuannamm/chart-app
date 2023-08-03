const checkDuplicateLabels = (labels) => {
  const duplicateIndices = [];
  const uniqueLabels = new Set();

  labels.forEach((label, index) => {
    if (uniqueLabels.has(label)) {
      duplicateIndices.push(index);
    } else {
      uniqueLabels.add(label);
    }
  });

  return duplicateIndices;
};

const checkForDuplicates = (labels) => {
  const duplicates = labels.reduce((acc, label, index) => {
    if (labels.indexOf(label) !== index && acc.indexOf(label) === -1) {
      acc.push(label);
    }
    return acc;
  }, []);
  return labels.map((label) => duplicates.includes(label));
};

export { checkDuplicateLabels, checkForDuplicates };
