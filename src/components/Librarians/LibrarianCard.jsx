import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Popconfirm, Tooltip, Typography } from "antd";
const { Text, Title } = Typography;

function LibrarianCard({ librarian, onDelete }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={librarian.avatarUrl}
            className="bg-blue-500"
          />
          <div>
            <Title level={4} className="text-gray-100 m-0 mb-1">
              {librarian.name || "Amonymous"}
            </Title>
            <Text className="text-gray-300 block">{librarian.username}</Text>
          </div>
        </div>
        <div className="flex-grow">
          <Text className="text-gray-400 text-sm block mb-2">
            Born: {librarian.dob || "N/A"}
          </Text>
          <Text className="text-gray-400 text-sm block mb-2">
            Phone: {librarian.phone || "N/A"}
          </Text>
          <Text className="text-gray-400 text-sm block mb-2">
            Gender: {librarian.gender || "Not specified"}
          </Text>
        </div>
        <div className="flex justify-end space-x-2">
          <Popconfirm
            title="Delete this librarian"
            description="Are you sure you want delete this librarian?"
            onConfirm={() => onDelete(librarian.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                aria-label="Delete librarian"
              />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
}

export default LibrarianCard;
