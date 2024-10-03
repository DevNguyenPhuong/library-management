export const createEmptyRows = (count, startIndex) => {
  return Array(count)
    .fill()
    .map((_, index) => ({
      key: `empty-${startIndex + index}`,
      id: "",
      name: "",
      dob: "",
      gender: "",
      currentlyBorrowed: "",
      membershipDate: "",
      isEmpty: true,
    }));
};

export const prepareTableData = (data, emptyRowsCount) => {
  const dataWithKeys = data.map((item, index) => ({
    ...item,
    key: item.id || `patron-${index}`,
  }));

  return [
    ...dataWithKeys,
    ...createEmptyRows(emptyRowsCount, dataWithKeys.length),
  ];
};
