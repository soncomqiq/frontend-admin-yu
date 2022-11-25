import React, {useEffect, useState} from "react";
import {Button, Col, Input, Modal, Row, Select, Space, Table} from "antd";
import axios from "../config/axios";

const {Search} = Input
const {Option} = Select

export function AdminList(props) {
  const [data, setData] = useState([]);
  const [by, setBy] = useState("Username")
  const [open, setOpen] = useState(false);
  const [curAdmin, setCurAdmin] = useState({})

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
            <a>Edit</a>
            <a onClick={() => showModal(record)}>Delete</a>
          </Space>
      ),
    },
  ];

  const showModal = (record) => {
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
        <Modal
            title="Modal"
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
              <Button>Add new admin</Button>
            </Row>
          </Col>
        </Row>
      </>
  )
}

export default AdminList;