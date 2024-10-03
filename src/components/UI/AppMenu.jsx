import React, { useEffect, useState } from "react";
import { Avatar, Menu } from "antd";
import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export function SidderMenu() {
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
          icon: <HiOutlineCalendar />,
        },

        {
          label: "Patrons",
          key: "/patrons",
          icon: <HiOutlineBookOpen />,
        },
        {
          label: "Books",
          key: "/books",
          icon: <HiOutlineUser />,
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
