import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = "http://4bdb0d05d756.ngrok.io:3000";

export interface BinTypes {
  binId: string;
  height: number;
  lat: number;
  length: number;
  lng: number;
  width: number;
}

function NewBinModal({ handleNewBin }: any): JSX.Element {

  const [isModalVisible, setIsModalVisible,] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    let socket = io(SOCKET_ENDPOINT);
    socket.emit("join", (error: any) => {
      console.log("join");
      if (error) {
        alert(error);
      }
    });
    socket.on("data", (message: any) => {
      console.log(message);
    });
  }, []);

  function showModal() {
    setIsModalVisible(true);
  };

  function handleOk(values: BinTypes) {
    console.log(values);
    handleNewBin(values)
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 25,
        right: 25,
        zIndex: 1100,
      }}
    >
      <Button
        type="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={showModal}><PlusOutlined />
      </Button>
      <Modal
        title="Add a new bin"
        visible={isModalVisible}
        footer={null}>
        <div className="flex flex-grow flex-col">
          <p className="text-gray-600">Complete the following fields to add a new bin.</p>
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={handleOk}
        >
          <div className="px-3">
            <Form.Item
              label="Bin Name"
              name="binId"
              rules={[
                {
                  required: true,
                  message: "Required"
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex">
            <div className="w-1/2 px-3">
              <Form.Item
                className="w-full"
                label="Latitude"
                name="lat"
                rules={[
                  {
                    required: true,
                    message: "Required"
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="w-1/2 px-3">
              <Form.Item
                className="w-full"
                label="Longitude"
                name="lng"
                rules={[
                  {
                    required: true,
                    message: "Required"
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/3 px-3">
              <Form.Item
                className="w-full"
                label="Width"
                name="width"
                rules={[
                  {
                    required: true,
                    message: "Required"
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="w-1/3 px-3">
              <Form.Item
                className="w-full"
                label="Height"
                name="height"
                rules={[
                  {
                    required: true,
                    message: "Required"
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="w-1/3 px-3">
              <Form.Item
                className="w-full"
                label="Length"
                name="length"
                rules={[
                  {
                    required: true,
                    message: "Required"
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
          </div>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default NewBinModal;
