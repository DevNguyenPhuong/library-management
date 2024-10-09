export const FakePatronData = [
  {
    id: "1",
    name: "John Brown",
    dob: "1990-05-15",
    gender: "MALE",
    currentlyBorrowed: 2,
    membershipDate: "2020-01-01",
  },
  {
    id: "2",
    name: "Jane Green",
    dob: "1985-09-22",
    gender: "FEMALE",
    currentlyBorrowed: 1,
    membershipDate: "2019-11-15",
  },
  {
    id: "3",
    name: "Alex White",
    dob: "1995-12-03",
    gender: "OTHER",
    currentlyBorrowed: 0,
    membershipDate: "2021-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    dob: "1988-07-30",
    gender: "FEMALE",
    currentlyBorrowed: 3,
    membershipDate: "2018-06-22",
  },
  {
    id: "5",
    name: "Michael Johnson",
    dob: "1992-11-08",
    gender: "MALE",
    currentlyBorrowed: 1,
    membershipDate: "2020-09-05",
  },
  {
    id: "6",
    name: "Sophia Lee",
    dob: "1997-02-14",
    gender: "FEMALE",
    currentlyBorrowed: 2,
    membershipDate: "2021-12-30",
  },
  {
    id: "7",
    name: "Daniel Taylor",
    dob: "1983-04-19",
    gender: "MALE",
    currentlyBorrowed: 0,
    membershipDate: "2017-08-11",
  },
  {
    id: "8",
    name: "Daniel Taylor",
    dob: "1983-04-19",
    gender: "MALE",
    currentlyBorrowed: 0,
    membershipDate: "2017-08-11",
  },
  {
    id: "9",
    name: "Daniel Taylor",
    dob: "1983-04-19",
    gender: "MALE",
    currentlyBorrowed: 0,
    membershipDate: "2017-08-11",
  },
  {
    id: "9s",
    name: "Daniel Taylor",
    dob: "1983-04-19",
    gender: "MALE",
    currentlyBorrowed: 0,
    membershipDate: "2017-08-11",
  },
];

export const fakeUsers = [
  {
    id: "1",
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    dob: "1990-05-15",
    roles: ["User", "Admin"],
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    username: "janesmit",
    firstName: "Jane",
    lastName: "Smith",
    dob: "1988-09-22",
    roles: ["User", "Editor"],
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "3",
    username: "bobwilson",
    firstName: "Bob",
    lastName: "Wilson",
    dob: "1995-12-03",
    roles: ["User"],
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "4",
    username: "alicegreen",
    firstName: "Alice",
    lastName: "Green",
    dob: "1992-07-18",
    roles: ["User", "Moderator"],
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  },
];

// FOR Dashboard

export const bookStats = {
  totalBooks: 5000,
  borrowedBooks: 1250,
  overdueBooks: 75,
  activeMembers: 850,
};

export const categoryData = [
  { name: "Fiction", value: 2000 },
  { name: "Non-Fiction", value: 1500 },
  { name: "Science", value: 1000 },
  { name: "History", value: 500 },
];

export const monthlyData = [
  { month: "Jan", borrowed: 320, returned: 280 },
  { month: "Feb", borrowed: 350, returned: 300 },
  { month: "Mar", borrowed: 400, returned: 380 },
  { month: "Apr", borrowed: 450, returned: 400 },
  { month: "May", borrowed: 500, returned: 470 },
  { month: "Jun", borrowed: 480, returned: 460 },
];

export const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"];

export const initialPatron = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "John Doe",
  dob: "1990-05-15",
  gender: "MALE",
  currentlyBorrowed: 3,
  membershipDate: "2023-01-01",
};

export const borrowedBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    dueDate: "2024-10-15",
    status: "On Time",
    image:
      "https://ik.imagekit.io/demo/tr:w-300,h-300/medium_cafe_B1iTdD0C.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    dueDate: "2024-10-20",
    status: "Overdue",
    image:
      "https://ik.imagekit.io/demo/tr:w-300,h-300/medium_cafe_B1iTdD0C.jpg",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dueDate: "2024-10-25",
    status: "On Time",
    image:
      "https://ik.imagekit.io/demo/tr:w-300,h-300/medium_cafe_B1iTdD0C.jpg",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dueDate: "2024-10-25",
    status: "On Time",
    image:
      "https://ik.imagekit.io/demo/tr:w-300,h-300/medium_cafe_B1iTdD0C.jpg",
  },
  {
    id: 5,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dueDate: "2024-10-25",
    status: "On Time",
    image:
      "https://ik.imagekit.io/demo/tr:w-300,h-300/medium_cafe_B1iTdD0C.jpg",
  },
];

export const fines = [
  {
    id: 1,
    bookTitle: "1984",
    amount: 5.0,
    dueDate: "2024-09-20",
    status: "Unpaid",
  },
  {
    id: 2,
    bookTitle: "Pride and Prejudice",
    amount: 3.5,
    dueDate: "2024-09-15",
    status: "Paid",
  },
  {
    id: 3,
    bookTitle: "Pride and Prejudice",
    amount: 3.5,
    dueDate: "2024-09-15",
    status: "Paid",
  },
  {
    id: 4,
    bookTitle: "Pride and Prejudice",
    amount: 3.5,
    dueDate: "2024-09-15",
    status: "Paid",
  },
  {
    id: 5,
    bookTitle: "Pride and Prejudice",
    amount: 3.5,
    dueDate: "2024-09-15",
    status: "Paid",
  },
];

export const fakeLoanData=[
  {
    "id": "1",
    "patronId": "P001",
    "bookId": "B101",
    "userId": "U001",
    "fineId": "F001",
    "loanD": "2024-01-10",
    "dueD": "2024-01-24",
    "returnD": "2024-01-22",
    "status": "returned"
  },
  {
    "id": "2",
    "patronId": "P002",
    "bookId": "B102",
    "userId": "U002",
    "fineId": "F002",
    "loanD": "2024-01-15",
    "dueD": "2024-01-29",
    "returnD": null,
    "status": "active"
  },
  {
    "id": "3",
    "patronId": "P003",
    "bookId": "B103",
    "userId": "U003",
    "fineId": "F003",
    "loanD": "2024-02-01",
    "dueD": "2024-02-15",
    "returnD": "2024-02-14",
    "status": "returned"
  },
  {
    "id": "4",
    "patronId": "P004",
    "bookId": "B104",
    "userId": "U004",
    "fineId": "F004",
    "loanD": "2024-02-05",
    "dueD": "2024-02-19",
    "returnD": "2024-02-20",
    "status": "overdue"
  },
  {
    "id": "5",
    "patronId": "P005",
    "bookId": "B105",
    "userId": "U005",
    "fineId": "F005",
    "loanD": "2024-03-01",
    "dueD": "2024-03-15",
    "returnD": "2024-03-12",
    "status": "returned"
  },
  {
    "id": "6",
    "patronId": "P006",
    "bookId": "B106",
    "userId": "U006",
    "fineId": "F006",
    "loanD": "2024-03-10",
    "dueD": "2024-03-24",
    "returnD": null,
    "status": "active"
  },
  {
    "id": "7",
    "patronId": "P007",
    "bookId": "B107",
    "userId": "U007",
    "fineId": "F007",
    "loanD": "2024-03-15",
    "dueD": "2024-03-29",
    "returnD": "2024-03-28",
    "status": "returned"
  },
  {
    "id": "8",
    "patronId": "P008",
    "bookId": "B108",
    "userId": "U008",
    "fineId": "F008",
    "loanD": "2024-04-01",
    "dueD": "2024-04-15",
    "returnD": null,
    "status": "active"
  },
  {
    "id": "9",
    "patronId": "P009",
    "bookId": "B109",
    "userId": "U009",
    "fineId": "F009",
    "loanD": "2024-04-10",
    "dueD": "2024-04-24",
    "returnD": "2024-04-20",
    "status": "returned"
  },
  {
    "id": "10",
    "patronId": "P010",
    "bookId": "B110",
    "userId": "U010",
    "fineId": "F010",
    "loanD": "2024-04-15",
    "dueD": "2024-04-29",
    "returnD": "2024-04-30",
    "status": "overdue"
  }
]

export const fakeCateData=[
  {
    "id": "1",
    "name": "Widget A",
    "description": "A high-quality widget that serves multiple purposes."
  },
  {
    "id": "2",
    "name": "Gadget B",
    "description": "An innovative gadget designed for everyday use."
  },
  {
    "id": "3",
    "name": "Tool C",
    "description": "A versatile tool that can handle any task with ease."
  },
  {
    "id": "4",
    "name": "Device D",
    "description": "A cutting-edge device that enhances productivity."
  },
  {
    "id": "5",
    "name": "App E",
    "description": "An app that simplifies your life with smart features."
  },
  {
    "id": "6",
    "name": "Gizmo F",
    "description": "A fun gizmo that adds excitement to your routine."
  },
  {
    "id": "7",
    "name": "Item G",
    "description": "A unique item that stands out from the crowd."
  },
  {
    "id": "8",
    "name": "Product H",
    "description": "A reliable product that delivers consistent performance."
  }
]

