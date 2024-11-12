import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Popconfirm, Tooltip, Typography } from "antd";
const { Text, Title } = Typography;

function UserItem({ user, onEdit, onDelete }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={user.avatarUrl}
            className="bg-blue-500"
          />
          <div>
            <Title level={4} className="text-gray-100 m-0 mb-1">
              {user.name || "Amonymous"}
            </Title>
            <Text className="text-gray-300 block">{user.username}</Text>
          </div>
        </div>
        <div className="flex-grow">
          <Text className="text-gray-400 text-sm block mb-2">
            Born: {user.dob || "N/A"}
          </Text>
          <Text className="text-gray-400 text-sm block mb-2">
            Phone: {user.phone || "N/A"}
          </Text>
          <Text className="text-gray-400 text-sm block mb-2">
            Gender: {user.gender || "Not specified"}
          </Text>
          <div className="flex flex-wrap gap-1 mb-4">
            {user.roles.map((role, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {role.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Tooltip title="Edit User">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(user.id)}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
            />
          </Tooltip>

          <Popconfirm
            title="Delete this user"
            description="Are you sure you want delete this user?"
            onConfirm={() => onDelete(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                aria-label="Delete copy"
              />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
}

export default UserItem;
