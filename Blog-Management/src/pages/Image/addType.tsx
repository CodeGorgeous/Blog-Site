import React, { useState, useEffect } from 'react'
import style from './css/addtype.less'
import { Col, Card, Button, Input, message, Tooltip, Select } from 'antd'
import { postImageType, getImageType, putImageType, deleteImageType } from '../../api/index'
import { connect } from 'umi'
import { UploadOutlined, ToolOutlined } from '@ant-design/icons'

interface Props {
    user?: any
    children?: any
}

const Component = (props: Props) => {
    const [typeList, setTypeList] = useState([])

    const [typeName, setTypeName] = useState('')
    const [image, setImage] = useState('')

    const [typeNameTwo, setTypeNameTwo] = useState('')
    const [imageTwo, setImageTwo] = useState('')
    const [selectKey, setSelectKey] = useState(1)
    const [selectKeyTwo, setSelectKeyTwo] = useState(1)

    const [lock, setLock] = useState(false)

    useEffect(() => {
        getImageType().then(resp => {
            setTypeList(resp.data.data)
            if (resp.data.data.length > 0) {
                setSelectKey(resp.data.data[0].id)
                setSelectKeyTwo(resp.data.data[0].id)
            }
        })
    }, [lock])

    const vTypeNode = typeList.map((item: any) => {
        return (
            <Select.Option key={item.id} value={item.id}>{item.type}</Select.Option>
        )
    })

    return (
        <div className={style['type-container']}>
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
                                    type: typeName,
                                    image,
                                    uid: props.user.spreadCode
                                }
                                postImageType(data).then(resp => {
                                    if (resp.data.state === 'success') {
                                        message.success('新增成功')
                                        setTypeName('')
                                        setImage('')
                                    } else {
                                        message.error(resp.data.msg)
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
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                封面展示图:
                            </span>
                            <Input
                                className={style['card-input']}
                                allowClear
                                value={image}
                                onChange={e => {
                                    setImage(e.target.value)
                                }}
                            />
                            <Tooltip placement="top" title="使用账户默认图片">
                                <Button
                                    className={style['input-tip']}
                                    icon={<ToolOutlined />}
                                    onClick={() => {
                                        setImage(props.user.imgUrl)
                                    }}
                                />
                            </Tooltip>
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
                                const data = {
                                    typeId: selectKey,
                                    name: typeNameTwo,
                                    image: imageTwo,
                                    uid: props.user.spreadCode
                                }
                                putImageType(data).then((resp: any) => {
                                    if (resp.data.state === 'success') {
                                        message.success('修改成功')
                                        setTypeNameTwo('')
                                        setImageTwo('')
                                        setLock(!lock)
                                    } else {
                                        message.error('删除失败')
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
                                value={selectKey}
                                style={{ width: 120 }}
                                onChange={(key) => {
                                    setSelectKey(key)
                                }}
                            >
                                {vTypeNode}
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
                        <Col className={style['card-col']}>
                            <span className={style['card-span']}>
                                封面展示图:
                            </span>
                            <Input
                                className={style['card-input']}
                                allowClear
                                value={imageTwo}
                                onChange={e => {
                                    setImageTwo(e.target.value)
                                }}
                            />
                            <Tooltip placement="top" title="使用账户默认图片">
                                <Button
                                    className={style['input-tip']}
                                    icon={<ToolOutlined />}
                                    onClick={() => {
                                        setImageTwo(props.user.imgUrl)
                                    }}
                                />
                            </Tooltip>
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
                                const params = {
                                    id: selectKeyTwo,
                                    uid: props.user.spreadCode
                                }
                                deleteImageType(params).then((resp: any) => {
                                    console.log(resp)
                                    if (resp.data.state === 'success') {
                                        message.success(resp.data.msg)
                                        setLock(!lock)
                                    } else {
                                        message.error(resp.data.msg)
                                    }
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
                                value={selectKeyTwo}
                                style={{ width: 120 }}
                                onChange={(key) => {
                                    setSelectKeyTwo(key)
                                }}
                            >
                                {vTypeNode}
                            </Select>
                        </Col>
                    </Card>
                </Col>
            </Card>
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () => ({}))(Component);