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

export default checkDuplicateLabels;
