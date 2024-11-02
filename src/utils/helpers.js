import { isBefore } from "date-fns";

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

export const getStatusAndColor = (status, dueDate) => {
  const now = new Date();
  const dueDateObj = new Date(dueDate);

  if (status === "RETURNED") {
    return {
      label: "RETURNED",
      color: "green",
    };
  }

  if (status === "BORROWED" && isBefore(dueDateObj, now)) {
    return {
      label: "OVERDUE",
      color: "red",
    };
  }

  return {
    label: "BORROWED",
    color: "blue",
  };
};
