{/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */}




import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Table, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const App = () => {
  const [formData, setFormData] = useState([]);
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form
      .validateFields()
      .then(values => {
        setFormData([...formData, { ...values, key: formData.length }]);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: 'Datum',
      dataIndex: 'date',
      key: 'date',
      render: (text) => text.format('DD.MM.YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Evidentirao',
      dataIndex: 'recorded',
      key: 'recorded',
    },
    {
      title: 'Potvrdio',
      dataIndex: 'confirmed',
      key: 'confirmed',
    },
    {
      title: 'Akcije',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined />
          <Popconfirm
            title="Are you sure to delete this entry?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    const dataSource = [...formData];
    setFormData(dataSource.filter(item => item.key !== key));
  };

  return (
    <div className="container mx-auto p-8">
      <Form form={form} layout="vertical">
        <Form.Item name="date" label="Datum" rules={[{ required: true }]}>
          <DatePicker format="DD.MM.YYYY" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select placeholder="Select a status">
            <Option value="Redovno">Redovno</Option>
            <Option value="Zabrinjavajuće">Zabrinjavajuće</Option>
            <Option value="Kritično">Kritično</Option>
            <Option value="Prazan">Prazan</Option>
          </Select>
        </Form.Item>
        <Form.Item name="recorded" label="Status Evidentirao" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="confirmed" label="Status Potvrdio" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleConfirm}>
            Potvrdi
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
            Odustani
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={formData} columns={columns} />
    </div>
  );
};

export default App;
