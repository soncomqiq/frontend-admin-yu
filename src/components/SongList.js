import React, { useEffect, useState } from "react";
import { Col, Row, Space, Table, Tabs } from 'antd';
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

export function SongList(props) {
  const [curType, setCurType] = useState("cafe");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/admins/song/list/${curType}`).then(res => {
      setData(res.data);
    })
  }, [curType])

  const onChange = (key) => {
    console.log(key);
    setCurType(key)
  };

  return (
    <>
      <Row justify="center">
        <Col span={23}>
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: `Cafe`,
                key: 'cafe',
                children: <Table rowKey="No" columns={columns} dataSource={data} />
              },
              {
                label: `Chill`,
                key: 'chill',
                children: <Table rowKey="No" columns={columns} dataSource={data} />
              },
            ]}
          />
        </Col>
      </Row>
    </>
  )
}

export default SongList;