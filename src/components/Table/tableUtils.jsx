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

export const createEmptyRowsLoan = (count, startIndex) => {
  return Array(count)
    .fill()
    .map((_, index) => ({
      key: `empty-${startIndex + index}`,
      id: "",
      patronId: "",
      bookId: "",
      userId: "",
      fineId: "",
      loanD: "",
      dueD: "",
      returnD: "",
      status: "",
      isEmpty: true,
    }));
};

export const prepareLoanTableData = (data, emptyRowsCount) => {
  const dataWithKeys = data.map((item, index) => ({
    ...item,
    key: item.id || `patron-${index}`,
  }));

  return [
    ...dataWithKeys,
    ...createEmptyRowsLoan(emptyRowsCount, dataWithKeys.length),
  ];
};

export const createEmptyRowsCategories = (count, startIndex) => {
  return Array(count)
    .fill()
    .map((_, index) => ({
      key: `empty-${startIndex + index}`,
      id: "",
      name: "",
      description: "",
      isEmpty: true,
    }));
};

export const prepareCategoriesTableData = (data, emptyRowsCount) => {
  const dataWithKeys = data.map((item, index) => ({
    ...item,
    key: item.id || `patron-${index}`,
  }));

  return [
    ...dataWithKeys,
    ...createEmptyRowsCategories(emptyRowsCount, dataWithKeys.length),
  ];
};

