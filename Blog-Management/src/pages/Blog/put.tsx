import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Card, message, Select } from 'antd'
import style from './css/put.less';
import { RollbackOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { history, connect } from 'umi' ;
import { putBlog, getBlog, getBlogType } from '@/api';
import { IUser, IRenderData } from '@/types/interfaces';
import ManageHeader from '@/components/ManageHeader';

interface IProps {
    user: IUser
}

const Component: React.FC<IProps> = (props) => {
    const blogMessage: any = history.location.state
    const [typeList, setTypeList] = useState<any>([])
    const [id, setId] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [lock, setLock] = useState<boolean>(false)
    const [blogKey, setBlogKey] = useState<number>(1)

    useEffect(() => {
        if (blogMessage) {
            setId(blogMessage.id)
            setText(blogMessage.markdownText)
            setBlogKey(blogMessage.type_id)
            setLock(true)
        }
    }, [])

    useEffect(() => {
        getBlogType().then(resp => {
            setTypeList(resp.data)
        })
    }, [])

    const vNode = typeList.map((item: any) => {
        return (<Select.Option value={item.id} key={item.id}>{item.typeName}</Select.Option>)
    })

    const renderData: IRenderData[] = [
        {
            path: '',
            name: '返回',
            icon: <RollbackOutlined />,
            onClick: () => {
                history.push('/blog/list');
            }
        },
        {
            path: '',
            name: '保存',
            icon: <CloudUploadOutlined />,
            onClick: () => {
                const blog = {
                    id: blogMessage ? blogMessage.id : + id,
                    uid: props.user.spreadCode,
                    text,
                    typeId: blogKey
                }
                putBlog(blog).then((resp: any) => {
                    if (resp.state === 'success') {
                        message.success('修改成功')
                        history.push('/blog/list')
                    } else {
                        message.error(resp.msg)
                    }
                })
            }
        }
    ];

    return (
        <div className={style['put-container']}>
            <ManageHeader renderData={renderData}/>
            <Card>
                <Row
                    className={style.row}
                >
                    <Col className={style.span}>文章分类:</Col>
                    <Col >
                        <Select
                            value={blogKey}
                            className={style.input}
                            onChange={(key) => {
                                setBlogKey(key)
                            }}
                        >
                            {vNode}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className={style.span}
                        style={{
                            display: 'inline-block',
                        }}
                    >文章内容:</Col>
                    <Input.TextArea
                        className={style['textarea']}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </Row>
            </Card>
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => {
    return {}
})(Component)
