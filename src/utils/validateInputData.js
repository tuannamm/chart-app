const hasUndefinedValue = (data) => {
  return data?.some(
    (item) =>
      item.labels.includes(undefined || "") ||
      item.series.some((serie) => serie?.data?.includes(undefined || ""))
  );
};

export default hasUndefinedValue;
