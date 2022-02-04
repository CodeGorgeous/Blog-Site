import React, { useState, useEffect } from 'react'
import { Table, Image, Tag, Button, Modal, message, Switch } from 'antd'
import style from './css/list.less'
import { DeleteOutlined, SearchOutlined, ToolOutlined, HighlightOutlined } from '@ant-design/icons'
import { getAllBlogs, deleteBlog } from '@/api/blog'
import { history, connect } from 'umi'
import { imageFall } from '../../utils/base64Imgs';
import ManageHeader from '../../components/ManageHeader';
import { IRenderData, IUser } from '../../types/interfaces';

interface IProps {
    user: IUser
}

const Component: React.FC<IProps> = (props) => {

    const [dataList, setDataList] = useState<any>([]);
    const [dataListTotal, setDataListTotal] = useState<number>(0);
    const [loadingLock, setLoadingLock] = useState(false);
    const renderData: IRenderData[] = [
        {
            name: '新增博客',
            path: '/blog/add',
            icon: <HighlightOutlined />,
            onClick: () => {
                history.push('/blog/add');
            }
        }
    ];
    const [lock, setLock] = useState(false);
    
    useEffect(() => {
        setLoadingLock(true);
        getAllBlogs().then((resp: any) => {
            setLoadingLock(false);
            const data = resp.data.list.map((item: any) => {
                return {
                    ...item,
                    key: item.id
                }
            });
            setDataList(data);
            setDataListTotal(resp.data.total);
        })
    }, [lock])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            fixed: true,
            width: 50,
        }, {
            title: '封面',
            dataIndex: 'occupyImg',
            render: (url: string) => {
                return (
                    <Image
                        width={100}
                        height={90}
                        alt="图片加载失败..."
                        src={url}
                        fallback={imageFall}
                    />
                )
            }
        }, {
            title: '文章名称',
            dataIndex: 'name',
            width: 200
        }, {
            title: '创建时间',
            dataIndex: 'createTimer',
            width: 150
        }, {
            title: '简介',
            dataIndex: 'introduce',
            width: 500,
            render: (text: string) => {
                return (
                    <div className={style['text-introduce']}>
                        {text}
                    </div>
                )
            }
        }, {
            title: '置顶',
            dataIndex: 'ifTop',
            render: () => {
                return (
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                )
            }
        }, {
            title: '标签',
            dataIndex: 'tags',
            render: (text: string) => {
                const nodes = text.split('|').map((item: string, index: number) => {
                    return (
                        <Tag
                            key={index}
                        >
                            {item}
                        </Tag>
                    )
                })
                return (
                    <div className={style['tag']}>
                        {nodes}
                    </div>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'options',
            fixed: false,
            width: 200,
            render: (text: any, record: any) => {
                return (<div>
                    <Button
                        className={style.btn}
                        icon={<SearchOutlined />}
                        onClick={() => {

                            history.push('/blog/lock', record);
                        }}
                    />
                    <Button
                        className={style.btn}
                        icon={<ToolOutlined/>}
                        onClick={() => {
                            message.info('当前正在修改文章');
                            history.push('/blog/put', record);
                        }}
                    />
                    <Button
                        className={style.btn}
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                            Modal.confirm({
                                title: `确定删除${record.name}这篇文章?`,
                                centered: true,
                                cancelText: '取消',
                                okText: '确定',
                                onOk: () => {
                                    deleteBlog({
                                        id: record.id,
                                        uid: props.user.spreadCode
                                    }).then((resp: any) => {
                                        if (resp.state == 'success') {
                                            message.success('删除文章成功!');
                                            setLock(!lock);
                                        } else {
                                            message.error('删除文章失败, 请稍后重新尝试!');
                                        }
                                    })
                                }
                            })
                        }}
                    />
                </div>)
            }
        },
    ]

    return (
        <div className={style['list-container']}>
            <ManageHeader renderData={renderData}/>
            <Table
                loading={loadingLock}
                columns={columns}
                dataSource={dataList}
                pagination={{
                    pageSize: 5
                }}
            />
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component)
