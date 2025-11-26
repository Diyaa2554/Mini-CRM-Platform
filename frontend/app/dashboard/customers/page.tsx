"use client"
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Table, Spin } from 'antd';


const Page = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() =>{
        const token = sessionStorage.getItem('googleIdToken');
        console.log(token, "token"); 
        if (token) {
            setAuthToken(token);
        } else {
            console.error('No auth token found');
        }
    }, [])
    useEffect(() => {
        if (authToken) {
            getAllCustomers();
        }
    }, [authToken]);
    const getAllCustomers = async ()=>{
        try{
            setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/getAllCustomers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await response.json();
        if (data.success) {
            setCustomers(data.response.customers);
        } else {
            console.error('Error fetching customers:', data.response.message);
        }
        console.log(data);
        setLoading(false);
        }catch(e){
            console.log(e);
        }
    }

    const props: UploadProps = {
        name: 'file',
            action:  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploads/customers`,
        headers: {
          authorization: `Bearer ${authToken}`,
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            getAllCustomers();
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

      
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          render: (text: string) => text || "-", 
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },
        {
          title: "External ID",
          dataIndex: "externalId",
          key: "externalId",
        },
        {
            title : "Edit",
            key : "edit",
            render: (_:string , record: any) =>{
                return (
                    <Button type='primary' onClick={() => {
                        console.log(record);
                    }} >Edit</Button>
                )
            }
        }
      ];


  return (
    <div className='h-screen flex flex-col px-10 mt-10 text-xl '>
        <h1 className='text-5xl font-bold' >Customers</h1>
        <div className='mt-5'>
        <Upload {...props}>
    <Button icon={<UploadOutlined />}>Bulk Upload</Button>
  </Upload>
        </div>
        <div className="mt-10">
        {loading ? (
          <div className='flex justify-center items-center h-64'>

            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={customers}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    </div>
  )
}

export default Page