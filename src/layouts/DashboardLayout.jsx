import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../components/sidebar";

const { Header, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((v) => !v);

  const headerButtonIcon = useMemo(
    () => (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />),
    [collapsed]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Button
            type="text"
            icon={headerButtonIcon}
            onClick={toggleCollapsed}
            style={{ fontSize: 16, marginLeft: 8 }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </Header>

        {/* Let each dashboard page control its own internal scrolling */}
        <Content style={{ overflow: "hidden", background: "#f5f5f5" }}>
          <div style={{ height: "100%" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
