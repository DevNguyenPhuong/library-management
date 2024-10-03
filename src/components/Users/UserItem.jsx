import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Card, Button, Tooltip, Typography, Avatar } from "antd";
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
              {user.username}
            </Title>
            <Text className="text-gray-300 block">
              {user.firstName} {user.lastName}
            </Text>
          </div>
        </div>
        <div className="flex-grow">
          <Text className="text-gray-400 text-sm block mb-2">
            Born: {user.dob}
          </Text>
          <div className="flex flex-wrap gap-1 mb-4">
            {user.roles.map((role, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {role}
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
          <Tooltip title="Delete User">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(user.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            />
          </Tooltip>
          <Tooltip title="Add role">
            <Button
              type="text"
              icon={<PlusSquareOutlined />}
              onClick={() => onDelete(user.id)}
              className="text-indigo-400 hover:text-indigo-300 hover:bg-red-900/20"
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}

export default UserItem;
