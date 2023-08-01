const checkDuplicateLabels = (labelArr) => {
  const duplicates = [];
  const uniqueLabels = new Set();

  labelArr.forEach((label, index) => {
    if (uniqueLabels.has(label)) {
      duplicates.push(index);
    } else {
      uniqueLabels.add(label);
    }
  });

  return duplicates;
};

export default checkDuplicateLabels;
