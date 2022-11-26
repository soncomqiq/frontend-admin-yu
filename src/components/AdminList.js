import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Modal, notification, Row, Select, Space, Table} from "antd";
import axios from "../config/axios";

const {Search} = Input
const {Option} = Select

export function AdminList(props) {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [by, setBy] = useState("Username")
  const [open, setOpen] = useState(false);
  const [curAdmin, setCurAdmin] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreation, setIsCreation] = useState(false);

  const columns = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'Username',
    },
    {
      title: 'Firstname',
      dataIndex: 'Firstname',
      key: 'Firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'Lastname',
      key: 'Lastname',
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'Password',
    },
    {
      title: 'action',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <a onClick={() => showEditModal(record)}>Edit</a>
            <a onClick={() => showDeleteModal(record)}>Delete</a>
          </Space>
      ),
    },
  ];

  const showEditModal = (admin) => {
    setIsModalOpen(true);
    form.setFieldsValue({...admin})
    setIsCreation(false)
  };

  const showCreateModal = () => {
    setIsCreation(true)
    setIsModalOpen(true);
    form.resetFields();
  }

  const handleEditOrCreateOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const submitEdit = (values) => {
    console.log(values)
    if (isCreation) {
      axios.post("/admins", values)
          .then(res => {
            notification.success({
              message: "Admin is created"
            })
            fetchData();
          })
          .catch(err => {
            notification.error({
              message: `Username: ${values.Username} is not available`
            })
          })
    } else {
      axios.put("/admins/" + values.Username, values)
          .then(res => {
            fetchData();
          })
    }
  }

  const showDeleteModal = (record) => {
    setOpen(true);
    setCurAdmin(record)
    console.log(record)
  };

  const onOk = () => {
    axios.delete(`/admins/${curAdmin.Username}`).then(res => {
      fetchData()
      setOpen(false);
    })
  };

  const fetchData = () => {
    axios.get("/admins/list").then(res => {
      setData(res.data)
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onSearch = (value) => {
    axios.get(`/admins/list?q=${value}&by=${by}`).then(res => {
      setData(res.data)
    })
  }

  const selectBefore = (
      <Select onChange={e => setBy(e)} defaultValue="Username" className="select-before">
        <Option value="Username">Username</Option>
        <Option value="Firstname">Firstname</Option>
        <Option value="Lastname">Lastname</Option>
        <Option value="Phone">Phone</Option>
        <Option value="Email">Email</Option>
      </Select>
  );

  return (
      <>
        <Modal title={isCreation ? "Create New Admin" : "Edit Admin"} open={isModalOpen} onOk={handleEditOrCreateOk}
               onCancel={() => setIsModalOpen(false)}>
          <Form
              onFinish={submitEdit}
              form={form}
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
          >
            <Form.Item name="No" label="No" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Username" label="Username" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Firstname" label="Firstname" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Lastname" label="Lastname" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Phone" label="Phone" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Email" label="Email" rules={[{required: true}, {type: 'email'}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Password" label="Password" rules={[{required: true}]}>
              <Input type="password"/>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
            title="Delete"
            open={open}
            onOk={onOk}
            onCancel={() => setOpen(false)}
            okText="Delete"
            cancelText="Cancel"
        >
          <p>Are you sure to delete {curAdmin.Username} ?</p>
        </Modal>
        <Row justify="center">
          <Col span={23}>
            <Search
                addonBefore={selectBefore}
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={23}>
            <Table rowKey="No" columns={columns} dataSource={data}/>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={23}>
            <Row justify="end">
              <Button onClick={showCreateModal}>Add new admin</Button>
            </Row>
          </Col>
        </Row>
      </>
  )
}

export default AdminList;