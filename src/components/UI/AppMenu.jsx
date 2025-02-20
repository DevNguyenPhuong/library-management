import { Avatar, Badge, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { FaCartPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  HiOutlineBookOpen,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/Authentication/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getAllData } from "../../services/apiLibrary";
import { setCartItems } from "../../store/userSlice";

const menuItems = {
  LIBRARIAN: [
    {
      label: "Patrons",
      key: "/librarian/patrons",
      icon: <HiOutlineUser />,
      index: 3,
    },
    {
      label: "Books",
      key: "/librarian/books",
      icon: <HiOutlineBookOpen />,
      index: 4,
    },
    {
      label: "Authors",
      key: "/librarian/authors",
      icon: <HiOutlineUsers />,
      index: 5,
    },
    {
      label: "Categories",
      key: "/librarian/categories",
      icon: <HiOutlineTag />,
      index: 6,
    },
    {
      label: "Publishers",
      key: "/librarian/publishers",
      icon: <HiOutlineOfficeBuilding />,
      index: 7,
    },
    {
      label: "My-info",
      key: "/librarian/my-info",
      icon: <HiOutlineUser />,
      index: 8,
    },
  ],

  ADMIN: [
    {
      label: "Home",
      key: "/admin/dashboard",
      icon: <HiOutlineHome />,
      index: 1,
    },
    {
      label: "Users",
      key: "/admin/users",
      icon: <HiOutlineUserGroup />,
      index: 2,
    },
    {
      label: "Librarians",
      key: "/admin/librarians",
      icon: <HiOutlineUserGroup />,
      index: 2,
    },
    {
      label: "My-info",
      key: "/my-info",
      icon: <HiOutlineUser />,
      index: 8,
    },
  ],

  PATRON: [
    {
      label: "My-info",
      key: "/patron/my-info",
      icon: <HiOutlineUser />,
      index: 8,
    },
    {
      label: "Books",
      key: "/patron/books",
      icon: <HiOutlineBookOpen />,
      index: 4,
    },
  ],
};

export function SiderMenu({ roles }) {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  const location = useLocation();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  function combineRole(roles) {
    const userRoleNames = roles.map((role) => role.name);
    const uniqueMenuItems = new Map(); // Use Map to track unique items by key

    userRoleNames.forEach((roleName) => {
      if (menuItems[roleName]) {
        menuItems[roleName].forEach((menuItem) => {
          // Only add the item if it doesn't exist or has a lower index
          if (
            !uniqueMenuItems.has(menuItem.key) ||
            uniqueMenuItems.get(menuItem.key).index > menuItem.index
          ) {
            uniqueMenuItems.set(menuItem.key, menuItem);
          }
        });
      }
    });

    // Convert Map values to array and sort by index
    return Array.from(uniqueMenuItems.values()).sort(
      (a, b) => a.index - b.index
    );
  }

  return (
    <Menu
      className="font-bold"
      items={combineRole(roles)}
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={({ key }) => {
        navigate(key);
      }}
    />
  );
}

export function HeaderMenu({ patronId, roles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPatron = roles?.some((role) => role.name === "PATRON");

  const {
    data: shoppingSession,
    isLoading: isLoadingCart,
    isSuccess,
  } = useQuery({
    queryFn: () => getAllData(`/patrons/${patronId}/shopping-session`),
    queryKey: ["shopping-session"],
    enabled: isPatron, // This will prevent the query from running if isPatron is false
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setCartItems({
          cartItems: shoppingSession?.cartItems,
          shoppingSessionId: shoppingSession?.id,
        })
      );
    }
  }, [isSuccess, shoppingSession, dispatch]);

  const { logout } = useLogout();
  const jwt = useSelector((store) => {
    const storeJwt = store.user.token;

    return storeJwt && storeJwt !== ""
      ? storeJwt
      : localStorage.getItem("token");
  });

  const username = useSelector((store) => {
    const storeName = store.user.username;

    return storeName && storeName !== ""
      ? storeName
      : localStorage.getItem("username");
  });

  return (
    <Menu
      selectedKeys={[""]}
      theme={"dark"}
      className="flex-1  min-w-0 bg-transparent w-full  justify-end"
      mode="horizontal"
      onClick={({ key }) => {
        if (key === "avatar") {
          return;
        }
        if (key === "/shopping-session") {
          if (isLoadingCart) return;
          navigate("/patron/shopping-session");
        }
        if (key === "/logout") {
          logout(jwt);
        }
      }}
      items={[
        {
          label: (
            <div className="flex justify-center items-center gap-3">
              <Avatar className="bg-zinc-300" size={32} icon={<FaUser />} />
              <span>{username === "" ? "anonymous" : username}</span>
            </div>
          ),
          key: "avatar",
        },
        isPatron && {
          key: "/shopping-session",
          icon: (
            <Badge
              className="border-none"
              overflowCount={9}
              count={shoppingSession?.cartItems?.length}
              size="small"
            >
              <div className="w-full h-full">
                <FaCartPlus className="size-6" />
              </div>
            </Badge>
          ),
        },
        {
          label: "Log out",
          key: "/logout",
          icon: <FaSignOutAlt />,
        },
      ]}
    />
  );
}
