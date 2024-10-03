import { fakeUsers } from "../../data/fakeData";
import UserItem from "./UserItem";

function UsersList() {
  const handleEdit = () => {
    console.log(`Editing user with id: `);
  };

  const handleDelete = () => {
    console.log(`Deleting user with id: }`);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {fakeUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
