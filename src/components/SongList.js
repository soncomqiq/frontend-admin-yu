import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Modal, notification, Row, Select, Space, Table, Tabs} from 'antd';
import axios from "../config/axios";

const {Search} = Input
const {Option} = Select

export function SongList(props) {
  const [form] = Form.useForm();
  const [curType, setCurType] = useState("cafe");
  const [data, setData] = useState([]);
  const [by, setBy] = useState("NamePlaylist")
  const [open, setOpen] = useState(false);
  const [curSong, setCurSong] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreation, setIsCreation] = useState(false);

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
            <a onClick={() => showEditModal(record)}>Edit</a>
            <a onClick={() => showDeleteModal(record)}>Delete</a>
          </Space>
      ),
    },
  ];

  const showDeleteModal = (record) => {
    setOpen(true);
    setCurSong(record)
  };

  const showEditModal = (admin) => {
    setIsModalOpen(true);
    form.setFieldsValue({...admin})
    setIsCreation(false)
  };

  const submitEdit = (values) => {
    console.log(values)
    if (isCreation) {
      axios.post("/admins/song", values)
          .then(res => {
            notification.success({
              message: "Song is created"
            })
            fetchData();
          })
          .catch(err => {
            notification.error({
              message: `Creation error`
            })
          })
    } else {
      axios.put("/admins/song/" + values.PlaylistID, values)
          .then(res => {
            fetchData();
          })
    }
  }

  const fetchData = () => {
    axios.get(`/admins/song/list/${curType}`).then(res => {
      setData(res.data);
    })
  }

  useEffect(() => {
    fetchData();
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

  const onOk = () => {
    axios.delete(`/admins/song/${curSong.PlaylistID}`).then(res => {
      fetchData()
      setOpen(false);
    })
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
            <Form.Item name="PlaylistID" label="PlaylistID" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="NamePlaylist" label="NamePlaylist" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="LinkYoutube" label="LinkYoutube" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Channel" label="Channel" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Time" label="Time" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="Type" label="Type" rules={[{required: true}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="LinkPicture" label="LinkPicture" rules={[{required: true}]}>
              <Input/>
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
          <p>Are you sure to delete PlayListID: {curSong.PlaylistID} ?</p>
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
        <Row justify="center">
          <Col span={23}>
            <Row justify="end">
              <Button onClick={showCreateModal}>Add new song</Button>
            </Row>
          </Col>
        </Row>
      </>
  )
}

export default SongList;