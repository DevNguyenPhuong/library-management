import { Layout } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { HeaderMenu, SiderMenu } from "./AppMenu";
const { Header, Content, Sider } = Layout;

function AppLayout() {
  const { roles } = useSelector((store) => store.user);
  const [collapsed, setCollapsed] = useState(false);
  const layoutConfig = {
    true: "ml-[80px] transition-ml duration-300 ",
    false: "ml-[200px] transition-ml duration-300 ",
  };

  return (
    <Layout hasSider>
      <Sider
        theme={"dark"}
        className="!overflow-auto !h-screen !fixed !left-0 !top-0  !bottom-0 z-20"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className=" h-16 flex items-center justify-center font-bold text-slate-300"></div>
        <SiderMenu roles={roles} />
      </Sider>

      <Layout className={`${layoutConfig[collapsed]}`}>
        <Header className="fixed w-full top-0 left-0 z-10 flex items-center font-bold ">
          <HeaderMenu />
        </Header>

        <Content className="m-6 mt-20 lg:mt-16 mx-4 ">
          <div className=" lg:mt-4 lg:p-6 rounded-lg min-h-[90vh]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
