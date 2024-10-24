export const getGenderColor = (gender) => {
  switch (gender?.toLowerCase()) {
    case "male":
      return "blue";
    case "female":
      return "pink";
    default:
      return "purple";
  }
};
