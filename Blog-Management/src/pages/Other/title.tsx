import React, { useState, useEffect }from 'react'
import style from './css/title.less'
import { getAllTitle, postTitle, deleteTitle } from '@/api'
import { Table, Switch, Button, Modal, Input, message } from 'antd'
import { connect } from 'umi'
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { IRenderData, IUser, ITitleData, IResponse } from '@/types/interfaces';
import ManageHeader from '@/components/ManageHeader';

interface IProps {
    user: IUser
}

const Component: React.FC<IProps> = (props) => {

    const [titleList, setTitleList] = useState<ITitleData[]>([]);
    const [titleText, setTitleText] = useState<string>('');
    const [lock, setLock] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalLoading, setModalLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getAllTitle(props.user.spreadCode).then((resp: any) => {
            const result: IResponse = resp;
            const newTitleList: ITitleData[] = result.data.rows.map((item: any) => {
                return {
                    ...item,
                    key: item.id
                }
            })
            setTitleList(newTitleList);
            setLoading(false);
        })
    }, [lock])

    const renderData: IRenderData[] = [
        {
            path: '',
            name: '新增标语',
            icon: <CloudUploadOutlined />,
            onClick: () => {
                setTitleText('');
                setModalVisible(true);
            }
        }
    ];

    const handleOk = () => {
        // TODO: 拿到input的value值并进行新增请求
        if (!titleText) return message.error('请填写内容');
        setModalLoading(true);
        postTitle({
            text: titleText,
            uid: props.user.spreadCode,
        }).then((resp: any) => {
            const result: IResponse = resp;
            if (result.state == 'success') {
                message.error('新增成功')
                setModalLoading(false);
                setModalVisible(false);
                setLock(!lock);
            } else {
                message.error('新增失败')
            }
        })
    };
    const handleCancel = () => {
        setModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            align: 'center' as 'center',
            dataIndex: 'id',
            width: 30
        }, {
            title: '标语内容',
            dataIndex: 'title',
        }, {
            title: '优先',
            align: 'center' as 'center',
            dataIndex: 'ifPriority',
            width: 100,
            render: () => {
                return (
                    <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
                )
            }
        }, {
            title: '操作',
            align: 'center' as 'center',
            dataIndex: 'options',
            width: 100,
            render: (text: string, record: any) => {
                return (
                    <>
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => {
                                // TODO: 触发删除请求
                                Modal.confirm({
                                    title: `是否删除id为${record.id}的这条标语`,
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => {
                                        deleteTitle({
                                            id: record.id,
                                            uid: props.user.spreadCode
                                        }).then((resp: any) => {
                                            const result: IResponse = resp;
                                            if (result.state === 'success') {
                                                message.success('删除成功');
                                                setLock(!lock);
                                            } else {
                                                message.error('删除失败')
                                            }
                                        })
                                    }
                                })
                            }}
                        />
                    </>
                )
            }
        }
    ];


    return (
        <>
            <ManageHeader renderData={renderData}/>
            <Table
                columns={columns}
                dataSource={titleList}
                loading={loading}
                pagination={{
                    pageSize: 10
                }}
            />
            <Modal
                title="新增标语"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="back"
                        onClick={handleCancel}
                    >
                      取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={modalLoading}
                        onClick={handleOk}
                    >
                      提交
                    </Button>,
                ]}
            >
                <Input
                    placeholder="请输入标题内容"
                    allowClear
                    value={titleText}
                    onChange={e => setTitleText(e.target.value)}
                />
            </Modal>
        </>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component);
