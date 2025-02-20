import { Card, Space, Tag } from "antd";
import bookImgPlaceHolder from "../../assets/book.png";
import { getImageName } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

function BookCard({ id, title, price, authors, categories, imageUrl }) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      cover={
        <div
          className="h-72 overflow-hidden"
          onClick={() => navigate(`/patron/books/${id}`)}
        >
          <img
            src={getImageName(imageUrl) !== "" ? imageUrl : bookImgPlaceHolder}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      }
      className="px-3 pt-3 flex flex-col"
    >
      <div>
        <div className="font-semibold text-base mb-1 truncate" title={title}>
          {title}
        </div>
        <div className="text-gray-500 text-xs mb-1 truncate">
          {authors.map((author) => author.name).join(", ")}
        </div>
        <div className="text-red-500 font-semibold text-sm">
          {price.toLocaleString()} VNĐ
        </div>
      </div>
      <Space className="mt-2" wrap>
        {categories?.map((category, index) => (
          <Tag key={index} color="blue" className="mr-1 mb-1">
            {category.name}
          </Tag>
        ))}
      </Space>
    </Card>
  );
}

export default BookCard;
