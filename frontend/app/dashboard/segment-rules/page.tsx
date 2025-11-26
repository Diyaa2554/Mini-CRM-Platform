"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/segmentRules/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("googleIdToken")}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Segment rule created successfully!");
        form.resetFields();
      } else {
        message.error("Failed to create segment rule.");
      }
    } catch (error) {
      message.error("An error occurred while creating the segment rule.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-16 px-6">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Create Segment Rule
        </h1>

        <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
          <Form.Item
            label="Logic Type"
            name="logicType"
            rules={[{ required: true, message: "Please select a logic type" }]}
          >
            <Select
              placeholder="Select logic type"
              size="middle"
              className="rounded-md"
              options={[
                { label: "AND", value: "AND" },
                { label: "OR", value: "OR" },
              ]}
            />
          </Form.Item>

          <Form.List name="conditions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className="flex flex-wrap gap-4 mb-5 items-center"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "field"]}
                      rules={[{ required: true, message: "Please enter a field" }]}
                      className="flex-grow min-w-[150px]"
                    >
                      <Input
                        placeholder="Field (e.g., spend, visits)"
                        size="middle"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "op"]}
                      rules={[{ required: true, message: "Please enter an operator" }]}
                      className="w-24"
                    >
                      <Input
                        placeholder="Operator (>, <, =)"
                        size="middle"
                        className="text-center"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Please enter a value" }]}
                      className="flex-grow min-w-[150px]"
                    >
                      <Input
                        placeholder="Value (e.g., 10000, 3)"
                        size="middle"
                      />
                    </Form.Item>

                    <Button
                      type="text"
                      danger
                      onClick={() => remove(name)}
                      size="middle"
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    size="middle"
                    className="text-gray-700 border-gray-400 hover:border-gray-600 hover:text-gray-900"
                  >
                    + Add Condition
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="middle"
              block
              className="rounded-md"
            >
              Create Segment Rule
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Page;
