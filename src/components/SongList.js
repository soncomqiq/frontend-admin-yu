import React, {useEffect, useState} from "react";
import {Col, Input, Row, Select, Space, Table, Tabs} from 'antd';
import axios from "../config/axios";

const columns = [
  {
    title: 'PlaylistID',
    dataIndex: 'PlaylistID',
    key: 'PlaylistID',
  },
  {
    title: 'NamePlaylist',
    dataIndex: 'NamePlaylist',
    key: 'NamePlaylist',
  },
  {
    title: 'LinkYoutube',
    dataIndex: 'LinkYoutube',
    key: 'LinkYoutube',
  },
  {
    title: 'Channel',
    dataIndex: 'Channel',
    key: 'Channel',
  },
  {
    title: 'Time',
    dataIndex: 'Time',
    key: 'Time',
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

const {Search} = Input
const {Option} = Select

export function SongList(props) {
  const [curType, setCurType] = useState("cafe");
  const [data, setData] = useState([]);
  const [by, setBy] = useState("NamePlaylist")

  useEffect(() => {
    axios.get(`/admins/song/list/${curType}`).then(res => {
      setData(res.data);
    })
  }, [curType])

  const onChange = (key) => {
    console.log(key);
    setCurType(key)
  };

  const onSearch = (value) => {
    axios.get(`/admins/song/list/${curType}?q=${value}&by=${by}`).then(res => {
      setData(res.data)
    })
  }

  const selectBefore = (
      <Select onChange={e => setBy(e)} defaultValue="NamePlaylist" className="select-before">
        <Option value="NamePlaylist">NamePlaylist</Option>
        <Option value="LinkYoutube">LinkYoutube</Option>
        <Option value="Channel">Channel</Option>
        <Option value="Time">Time</Option>
      </Select>
  );

  return (
      <>
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
            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                  {
                    label: `Cafe`,
                    key: 'cafe',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Chill`,
                    key: 'chill',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Forest`,
                    key: 'forest',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Library`,
                    key: 'library',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Night`,
                    key: 'night',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Rain`,
                    key: 'rain',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Relaxing`,
                    key: 'relaxing',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Spring`,
                    key: 'spring',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Waterfall`,
                    key: 'waterfall',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                  {
                    label: `Working`,
                    key: 'working',
                    children: <Table rowKey="No" columns={columns} dataSource={data}/>
                  },
                ]}
            />
          </Col>
        </Row>
      </>
  )
}

export default SongList;