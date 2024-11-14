import { Avatar, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  HiOutlineBookOpen,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineTag,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/Authentication/useLogout";
import { useSelector } from "react-redux";

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
  ],
};

export function SiderMenu({ roles }) {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  const location = useLocation();
  console.log(roles);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  function combineRole(roles) {
    const userRoleNames = roles.map((role) => role.name);
    const combinedMenuItems = [];

    userRoleNames.forEach((roleName) => {
      if (menuItems[roleName]) {
        combinedMenuItems.push(...menuItems[roleName]);
      }
    });

    combinedMenuItems.sort((a, b) => a.index - b.index);

    return combinedMenuItems;
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

export function HeaderMenu() {
  const { logout } = useLogout();
  const jwt = useSelector((store) => {
    const storeJwt = store.user.token;

    return storeJwt && storeJwt !== ""
      ? storeJwt
      : localStorage.getItem("token");
  });

  const name = useSelector((store) => {
    const storeName = store.user.name;

    return storeName && storeName !== ""
      ? storeName
      : localStorage.getItem("name");
  });

  return (
    <Menu
      theme={"dark"}
      className="flex-1 min-w-0 bg-transparent w-full  justify-end"
      mode="horizontal"
      onClick={({ key }) => {
        if (key === "/logout") {
          logout(jwt);
        }
      }}
      items={[
        {
          label: (
            <div className="flex justify-center items-center gap-3">
              <Avatar className="bg-zinc-300" size={32} icon={<FaUser />} />
              <span>{name===''? 'anonymous': name}</span>
            </div>
          ),
          key: "avatar",
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
