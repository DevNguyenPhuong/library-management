import { useQuery } from "@tanstack/react-query";
import { BiShoppingBag } from "react-icons/bi";

import { Result, Spin } from "antd";
import { useSelector } from "react-redux";
import { getAllData } from "../../services/apiLibrary";
import CartItem from "./CartItem";

export default function ShoppingSessionList() {
  const patronId =
    useSelector((store) => store.user.id) || localStorage.getItem("id");

  const {
    data: shoppingSession,
    isLoading: isLoadingCart,
    error: errorLoadingCart,
  } = useQuery({
    queryFn: () => getAllData(`/patrons/${patronId}/shopping-session`),
    queryKey: ["shopping-session"],
  });
  console.log(shoppingSession?.cartItems);

  if (isLoadingCart)
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spin size="large"></Spin>
      </div>
    );

  if (errorLoadingCart)
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Result
          status="error"
          title="Error"
          subTitle="Sorry, there was an error loading the data."
        />
      </div>
    );

  function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => {
      return total + item?.book?.price * item?.quantity;
    }, 0);
  }

  const sortedCartItems = shoppingSession?.cartItems
    ? [...shoppingSession.cartItems].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )
    : [];

  return (
    <div className=" mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-8 ">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center ">
            <BiShoppingBag className="mr-2" /> Shopping Cart
          </h1>
          <span className="text-gray-600">
            {shoppingSession?.cartItems?.length} items
          </span>
        </div>

        <div className="no-scrollbar h-[50vh] overflow-y-auto space-y-6">
          {sortedCartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>f
              <span>
                {calculateTotal(shoppingSession?.cartItems).toLocaleString()}{" "}
                VNĐ
              </span>
            </div>
          </div>

          <button className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
