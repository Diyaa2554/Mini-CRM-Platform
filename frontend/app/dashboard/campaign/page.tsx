  "use client";

  import React, { useEffect, useState } from "react";
  import { Form, Input, Button, Select, message } from "antd";
  import { BsStars } from "react-icons/bs";

  const { Option } = Select;

  const Page = () => {
    const [segmentRules, setSegmentRules] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<any[]>([]);

    const [form] = Form.useForm();
    useEffect(() => {
      const fetchSegmentRules = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/segmentRules/getAllSegmentRules`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("googleIdToken")}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setSegmentRules(data.response.segmentRules);
          } else {
            message.error("Failed to fetch segment rules.");
          }
        } catch (error) {
          console.error("Error fetching segment rules:", error);
          message.error("An error occurred while fetching segment rules.");
        }
      };

      fetchSegmentRules();
    }, []);

    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/getAllCustomers`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("googleIdToken")}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setCustomers(data.response.customers);
          } else {
            message.error("Failed to fetch customers.");
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
          message.error("An error occurred while fetching customers.");
        }
      };

      fetchCustomers();
    }, []);
    
    const generateGeminiMessage = async()=>{
      console.log("Generating message...");
      const {name, ruleId} = form.getFieldsValue();
      const rule = segmentRules.find((rule) => rule._id === ruleId);
      const sanitizedRule = rule?.conditions.map((condition : any ) =>{
        return condition.field + " " + condition.op + " " + condition.value
      }).join( " " + rule.logicType + " ")
      console.log("Sanitized Rule: ", sanitizedRule);
      const response = await fetch(`/api/generateGeminiMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rule: sanitizedRule,
        }),
      })

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        const aiMessage = String(data.message);
        form.setFieldsValue({ message: aiMessage });
        console.log(form.getFieldValue('message'), "updatedAt from");

        message.success("Message generated successfully!");

      }
      else {
        message.error("Failed to generate message.");
      }
    }

    // Handle form submission
    const handleSubmit = async (values: any) => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("googleIdToken")}`,
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (data.success) {
          message.success("Campaign created successfully!");
        } else {
          message.error("Failed to create campaign.");
        }
      } catch (error) {
        console.error("Error creating campaign:", error);
        message.error("An error occurred while creating the campaign.");
      }
      setLoading(false);
    };

    return (
      <div className="h-screen flex flex-col px-10 mt-10 text-xl">
        <h1 className="text-5xl font-bold">Create Campaign</h1>
        <div className="mt-5">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Campaign Name"
              name="name"
              rules={[{ required: true, message: "Please enter a campaign name" }]}
            >
              <Input placeholder="Enter campaign name" />
            </Form.Item>

            <Form.Item
              label="Select Segment Rule"
              name="ruleId"
              rules={[{ required: true, message: "Please select a segment rule" }]}
            >
              <Select placeholder="Select a segment rule">
                {segmentRules?.map((rule) => (
                  <Option key={rule._id} value={rule._id}>
                    {rule.logicType} - {rule.conditions.map((c: any) => `${c.field} ${c.op} ${c.value}`).join(", ")}
                  </Option>
                ))}
              </Select>
            </Form.Item>


            <Form.Item
              label="Select Customers"
              name="customerIds"
              rules={[{ required: true, message: "Please select at least one customer" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select customers"
                optionFilterProp="children"
              >
                {customers?.map((customer) => (
                  <Option key={customer._id} value={customer._id}>
                    {customer.name} ({customer.email})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Message Content"
              name="message"
              rules={[{ required: true, message: "Please enter a message" }]}
            >
              <Input.TextArea rows={4}
              value={form.getFieldValue('message')}
              onChange={(e) => form.setFieldsValue({ message: e.target.value })}
              placeholder="Enter personalized message" />
            </Form.Item>
              <Button type="primary" onClick={generateGeminiMessage} className="mb-2">
                Generate By AI
                <BsStars/>
              </Button>

            <Form.Item
              label="Intent (Optional)"
              name="intent"
            >
              <Input placeholder="Enter campaign intent (e.g., promotion, win-back)" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Campaign
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  };

  export default Page;