import React, {useEffect, useState} from "react";
import {Input, Select, Space, Table} from "antd";
import axios from "../config/axios";

const {Search} = Input
const {Option} = Select

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
          <a>Delete</a>
        </Space>
    ),
  },
];

export function AdminList(props) {
  const [data, setData] = useState([]);
  const [by, setBy] = useState("Username")

  useEffect(() => {
    axios.get("/admins/list").then(res => {
      setData(res.data)
    })
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
      <div>
        <Search
            addonBefore={selectBefore}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
        <Table rowKey="No" columns={columns} dataSource={data}/>
      </div>
  )
}

export default AdminList;