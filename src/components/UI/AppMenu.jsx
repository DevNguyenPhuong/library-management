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

export function SiderMenu() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("/dashboard");
  const location = useLocation();
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  return (
    <Menu
      className="font-bold"
      items={[
        {
          label: "Home",
          key: "/dashboard",
          icon: <HiOutlineHome />,
        },
        {
          label: "Users",
          key: "/users",
          icon: <HiOutlineUserGroup />,
        },

        {
          label: "Patrons",
          key: "/patrons",
          icon: <HiOutlineUser />,
        },
        {
          label: "Books",
          key: "/books",
          icon: <HiOutlineBookOpen />,
        },
        {
          label: "Categories",
          key: "/categories",
          icon: <HiOutlineTag />,
        },
        {
          label: "Authors",
          key: "/authors",
          icon: <HiOutlineUsers />,
        },
        {
          label: "Publishers",
          key: "/publishers",
          icon: <HiOutlineOfficeBuilding />,
        },
      ]}
      theme={"dark"}
      mode="inline"
      selectedKeys={selectedKey}
      onClick={({ key }) => {
        navigate(key);
      }}
    />
  );
}

export function HeaderMenu() {
  return (
    <Menu
      theme={"dark"}
      className="flex-1 min-w-0 bg-transparent w-full  justify-end"
      mode="horizontal"
      onClick={({ key }) => {
        if (key === "/logout");
      }}
      items={[
        {
          label: (
            <div className="flex justify-center items-center gap-3">
              <Avatar className="bg-zinc-300" size={32} icon={<FaUser />} />
              <span>{"anonymous"}</span>
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
