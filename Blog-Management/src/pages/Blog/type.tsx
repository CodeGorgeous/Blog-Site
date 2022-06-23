import React, { useState, useEffect } from 'react'
import style from './css/type.less'
import { Table, Typography, Popconfirm, Input, Form, Switch, message, Modal, Row, Col, Button } from 'antd'
import { postBlogType, getBlogType, putBlogType, deleteBlogType } from '../../api/index'
import { connect } from 'umi'
import { ToolOutlined, DeleteOutlined, HighlightOutlined } from '@ant-design/icons'
import { IRenderData, IUser } from '@/types/interfaces'
import ManageHeader from '@/components/ManageHeader'


interface IProps {
    user: IUser
}

const Component: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const [typeList, setTypeList] = useState<any>([])
    const [typeName, setTypeName] = useState('')
    const [modalShow, setModalShow] = useState(false);
    // 控制数据是否重新获取
    const [lock, setLock] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBlogType().then(resp => {
            const newData = resp.data.map((item: any) => {
                return {
                    ...item,
                    key: item.id
                }
            })
            setTypeList(newData);
            setLoading(false);
        })
    }, [lock])

    // 头部
    const renderData: IRenderData[]= [
        {
            path: '',
            name: '增添分类',
            icon: <HighlightOutlined/>,
            onClick: () => {
                setModalShow(true);
            }
        }
    ]

    // 表格相关操作
    const [editingKey, setEditingKey] = useState<string>('');
    const isEditing = (record: any) => record.key === editingKey;
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center' as 'center',
            fixed: true,
            width: 50,
        }, {
            title: '分类名称',
            dataIndex: 'typeName',
            editable: true
        }, {
            title: '置顶',
            dataIndex: 'ifTop',
            align: 'center' as 'center',
            width: 100,
            render: () => {
                return (
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                )
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            align: 'center' as 'center',
            width: 150,
            render: (text: string, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                  <span>
                    <Typography.Link
                        onClick={async () => {
                            const row = await form.validateFields();
                            const newData = [...typeList];
                            const index = newData.findIndex(item => record.key === item.key);
                            if (index > -1) {
                                newData[index] = {
                                    ...newData[index],
                                    ...row
                                }
                            }
                            const data = newData[index];
                            putBlogType({
                                typeId: data.id,
                                name: data.typeName,
                                uid: props.user.spreadCode
                            }).then((resp: any) => {
                                if (resp.state == 'success') {
                                    message.success('修改成功');
                                    setLock(!lock);
                                } else {
                                    message.error('修改失败, 请稍后进行尝试!');
                                }
                            })
                            setEditingKey('');
                        }}
                        style={{ marginRight: 8 }}
                    >
                        保存
                    </Typography.Link>
                    <Popconfirm
                        title="要放弃这次修改?"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => {
                            setEditingKey('');
                        }}
                    >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                    <span>
                        <Button
                            className={style.btn}
                            icon={<ToolOutlined/>}
                            disabled={editingKey !== ''}
                            onClick={() => {
                                setEditingKey(record.key);
                            }}
                        />
                        <Button
                            className={style.btn}
                            danger
                            icon={<DeleteOutlined/>}
                            disabled={editingKey !== ''}
                            onClick={() => {
                                Modal.confirm({
                                    title: `是否删除${record.typeName}?`,
                                    cancelText: '取消',
                                    okText: '确认',
                                    onOk: () => {
                                        deleteBlogType({
                                            id: record.id,
                                            uid: props.user.spreadCode
                                        }).then((resp: any) => {
                                            if (resp.state == 'success') {
                                                message.success('删除成功');
                                                setLock(!lock);
                                            } else {
                                                message.error(resp.msg);
                                            }
                                        })
                                    }
                                })
                            }}
                        />
                  </span>
                );
            }
        }
    ]

    const newColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
              record,
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
        };
    })

    return (
        <div>
            <ManageHeader renderData={renderData}/>
            <Form form={form} component={false}>
                <Table
                    loading={loading}
                    bordered
                    components={{
                        body: {
                        cell: EditableCell,
                        },
                    }}
                    dataSource={typeList}
                    columns={newColumns}
                    pagination={{
                        pageSize: 10,
                        // onChange: cancel,
                    }}
                    scroll={{ y: window.innerHeight - 320 }}
                />
            </Form>
            <Modal
                title="新增分类"
                visible={modalShow}
                onOk={() => {
                    if (!typeName) return message.warning('请填写分类名称');
                    postBlogType({
                        typeName: typeName,
                        uid: props.user.spreadCode
                    }).then((resp: any) => {
                        if (resp.state == 'success') {
                            message.success('新增成功');
                            setLock(!lock);
                            setTypeName('');
                            setModalShow(false);
                        } else {
                            message.error('新增失败, 请稍后进行尝试!');
                        }
                    })
                }}
                onCancel={() => {
                    setModalShow(false);
                }}
                cancelText="取消"
                okText="确认"
            >
                <Row>
                    <Col
                        className={style.span}
                    >
                        分类名称:
                    </Col>
                    <Input
                        value={typeName}
                        onChange={e => setTypeName(e.target.value)}
                        style={{
                            width: '70%',
                            display: 'inline-block'
                        }}
                    />
                </Row>
            </Modal>
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () => ({}))(Component);

/*
<Card className={style['card-box']}>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Button
                            className={style['card-button']}
                            type="primary"
                            icon={<UploadOutlined />}
                            onClick={() => {
                                if (!typeName) return message.error('分类名称不能为空!')
                                const data = {
                                    typeName,
                                    uid: props.user.spreadCode
                                }
                                postBlogType(data).then(resp => {
                                    if (resp.data.state === 'success') {
                                        setTypeName('')
                                        return message.success('新增成功!')
                                    }
                                    return message.error('新增失败!')
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Col>
                            <span className={style['card-span']}>
                                分类名称:
                            </span>
                            <Input
                                className={style['card-input']}
                                allowClear
                                value={typeName}
                                onChange={e => {
                                    setTypeName(e.target.value)
                                }}
                            />
                        </Col>
                    </Card>
                </Col>
            </Card>
            <Card className={style['card-box']}>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Button
                            className={style['card-button']}
                            type="primary"
                            icon={<UploadOutlined />}
                            onClick={() => {
                                if (!typeNameTwo) return message.error('分类名称不能为空!')
                                putBlogType({
                                    typeId: blogKey,
                                    name: typeNameTwo,
                                    uid: props.user.spreadCode
                                }).then((resp: any) => {
                                    if (resp.data.state === 'success') {
                                        message.success('修改成功!')
                                        setTypeNameTwo('')
                                        setLock(!lock)
                                    } else {
                                        message.error('修改失败!')
                                    }
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                目标分类:
                            </span>
                            <Select
                                value={blogKey}
                                className={style['card-input']}
                                onChange={(key) => {
                                    setBlogKey(key)
                                }}
                            >
                                {vNode}
                            </Select>
                        </Col>
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                分类名称:
                            </span>
                            <Input
                                className={style['card-input']}
                                allowClear
                                value={typeNameTwo}
                                onChange={e => {
                                    setTypeNameTwo(e.target.value)
                                }}
                            />
                        </Col>
                    </Card>
                </Col>
            </Card>
            <Card className={style['card-box']}>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Button
                            className={style['card-button']}
                            type="primary"
                            danger
                            icon={<UploadOutlined />}
                            onClick={() => {
                                Modal.confirm({
                                    title: '删除确认',
                                    content: `是否确定删除该分类?`,
                                    onOk() {
                                        deleteBlogType({
                                            id: blogKeyTwo,
                                            uid: props.user.spreadCode
                                        }).then((resp: any) => {
                                            if (resp.data.state === 'success') {
                                                message.success('修改成功!')
                                                setLock(!lock)
                                            } else {
                                                message.error(resp.data.msg)
                                            }
                                        })
                                    },
                                    cancelText: '取消',
                                    okText: '确定'
                                })
                            }}
                        >
                            删除
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={style['card-container']}
                        hoverable
                    >
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                目标分类:
                            </span>
                            <Select
                                value={blogKeyTwo}
                                className={style['card-input']}
                                onChange={(key) => {
                                    setBlogKeyTwo(key)
                                }}
                            >
                                {vNode}
                            </Select>
                        </Col>
                    </Card>
                </Col>
            </Card>
 */

interface IPropsTwo {
    editing: boolean
    dataIndex: string
    title: string
}

const EditableCell: React.FC<IPropsTwo> = ({
    dataIndex,
    title,
    editing,
    children,
    ...args
}) => {
return (
    <td {...args}>
    {editing ? (
        <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
                {
                required: true,
                message: `请填写分类名称`,
                },
            ]}
        >
            <Input />
        </Form.Item>
    ) : (
        children
    )}
    </td>
);
};
