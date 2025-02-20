import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Result, Spin } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createData, getAllData } from "../../services/apiLibrary";

function PatronBook() {
  const [quantity, setQuantity] = useState(1);
  const { shoppingSessionId } = useSelector((store) => store.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const {
    data: book,
    isLoading: isLoadingBook,
    error: errorBook,
  } = useQuery({
    queryFn: () => getAllData(`/books/${bookId}`),
    queryKey: ["books", bookId],
  });

  const { mutate: addtoCart, isPending: isAddingTocart } = useMutation({
    mutationFn: () =>
      createData(`/cart-item`, {
        sessionId: shoppingSessionId,
        bookId: book?.id,
        quantity: quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`shopping-session`],
      });

      toast.success("Add Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  function addQuantity() {
    console.log("f");
    if (quantity + 1 > 5) return;
    setQuantity(quantity + 1);
  }
  function minusQuantity() {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1);
  }

  if (isLoadingBook) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorBook) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  if (!book) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  return (
    <div className="bg-gray-100">
      <Button
        type="primary"
        icon={<HiArrowLeft />}
        onClick={() => navigate("/patron/books")}
      >
        Back
      </Button>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto"></div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{book?.title}</h2>
            <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                {book?.price.toLocaleString()} VNĐ
              </span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">
              Experience premium sound quality and industry-leading noise
              cancellation with these wireless headphones. Perfect for music
              lovers and frequent travelers.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <div className="flex space-x-2">
                <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
              </div>
            </div>

            <div className="mb-6">
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </div>
              <div className="flex items-center">
                <Button icon={<FaMinus />} onClick={minusQuantity}></Button>
                <div className="text-lg w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  {quantity}
                </div>
                <Button icon={<FaPlus />} onClick={addQuantity}></Button>
              </div>
            </div>

            <div className=" mb-6">
              <div className=" text-sm font-medium text-gray-700 mb-1">
                Total: {quantity * 12000}
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                disabled={isAddingTocart}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <FaPlus className="size-3" />
                BUY NOW
              </button>
              <button
                disabled={isAddingTocart}
                className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => addtoCart()}
              >
                <AiOutlineShoppingCart className="size-5" />
                Add to cart
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Industry-leading noise cancellation</li>
                <li>30-hour battery life</li>
                <li>Touch sensor controls</li>
                <li>Speak-to-chat technology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatronBook;
