import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { getImageName } from "../../utils/helpers";
import bookImgPlaceHolder from "../../assets/book.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData, updateData } from "../../services/apiLibrary";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";

function CartItem({ book, id, quantity }) {
  const queryClient = useQueryClient();
  const { mutate: updateItem, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data) => updateData(`/cart-item/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`shopping-session`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const { mutate: deleteItem, isPending: isPendingDelete } = useMutation({
    mutationFn: () => deleteData(`/cart-item/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`shopping-session`],
      });
      toast.success("Deleted");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  function hanldeUpdateQuantity(quantity) {
    if (quantity <= 0) return;
    updateItem({
      quantity,
    });
  }

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <img
          src={
            getImageName(book?.imageUrl) !== ""
              ? book?.imageUrl
              : bookImgPlaceHolder
          }
          alt={book.title}
          className="w-32 h-48 object-cover rounded-lg"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
          }}
        />
        <div>
          <h3 className="text-lg font-medium text-gray-800">{book.title}</h3>
          <p className="text-gray-600">{book.price.toLocaleString()} VNĐ</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-lg">
          <button
            disabled={isPendingDelete || isPendingUpdate}
            onClick={() => hanldeUpdateQuantity(quantity - 1)}
            className="p-2 hover:bg-gray-100 rounded-l-lg"
          >
            <FiMinus />
          </button>
          <span className="px-4">{quantity}</span>
          <button
            disabled={isPendingDelete || isPendingUpdate}
            onClick={() => hanldeUpdateQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-100 rounded-r-lg"
          >
            <FiPlus />
          </button>
        </div>
        <Popconfirm
          title="Delete this book"
          description="Are you sure you want delete this book?"
          onConfirm={() => deleteItem(id)}
          okText="Yes"
          cancelText="No"
        >
          <button
            disabled={isPendingDelete || isPendingUpdate}
            className="text-red-500 hover:text-red-600"
          >
            <FiTrash2 size={20} />
          </button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default CartItem;
