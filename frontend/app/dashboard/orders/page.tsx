"use client";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Table, Spin } from "antd";

const Page = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("googleIdToken");
    if (token) {
      setAuthToken(token);
    } else {
      console.error("No auth token found");
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      getAllOrders();
    }
  }, [authToken]);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/getAllOrders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setOrders(data.response.orders);
      } else {
        console.error("Error fetching orders:", data.message);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const props: UploadProps = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploads/orders`,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        getAllOrders();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns = [
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: string[] | string) => {
        if (Array.isArray(items)) {
          return items.join(", ");
        }
        return items || "-";
      },
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) =>
        amount != null ? `₹${amount.toFixed(2)}` : "-",
    },
    {
      title: "External ID",
      dataIndex: "externalId",
      key: "externalId",
      render: (text?: string) => text || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          onClick={() => {
            console.log("View/Edit order:", record);
          }}
        >
          View/Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141e30] to-[#243b55] p-10 text-white">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-white">
          🧾 Orders
        </h1>

        <div className="mb-6">
          <Upload {...props}>
            <Button
              icon={<UploadOutlined />}
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              Bulk Upload
            </Button>
          </Upload>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              bordered
              className="bg-white rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
