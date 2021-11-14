import React, { useState, useEffect } from 'react'
import style from './css/add.less'
import { Row, Col, Card, Button, Input, Select, message, Tooltip } from 'antd'
import { getAllResourcesType, postClassification, postResourcesType, postResources, } from '../../api/index'
import { connect } from 'umi'
import { ToolOutlined } from '@ant-design/icons'

const { Option } = Select

interface Props {
    children?: any
    user?: any
}

const Component = (props: Props) => {

    // 新增的大分类名称
    const [classificationName, setClassificationName] = useState('')
    // 新增的子分类名称
    const [resourcesTypeName, setResourcesTypeName] = useState('')
    // 新增资源
    // 资源名称
    const [resourcesName, setResourcesName] = useState('')
    // 资源地址
    const [resourcesUrl, setResourcesUrl] = useState('')
    // 资源图片
    const [resourcesImage, setResourcesImage] = useState('')
    // 资源描述
    const [resourcesIntroduce, setResourcesIntroduce] = useState('')
    // 资源标签
    const [resourcesTags, setResourcesTags] = useState<any>([])
    
    // 所有大分类
    const [classification, setClassification] = useState<any>([])
    // 所有子分类
    const [resourcesType, setResourcesType] = useState<any>([])

    // 选中的目标大分类id值
    const [classificationKey, setClassificationKey] = useState(1)
    // 选中的目标子分类id值
    const [resourcesTypeKey, setResourcesTypeKey] = useState(1)

    // 控制是否重新获取数据
    const [lock, setLock] = useState(false)

    useEffect(() => {
        // 拿取所有分类
        getAllResourcesType().then(resp => {
            const data = resp.data.data
            setClassification([...data])
            let resourcesType: any[] = []
            data.forEach((item: any) => {
                resourcesType = [...resourcesType, ...item.ResourcesTypes]
            })
            setResourcesType([...resourcesType])
        })
    }, [lock])

    // 根据大分类得到渲染的节点
    const vNodeClass = classification.map((item: any) => {
        return (
            <Option value={item.id} key={item.id}>{item.type}</Option>
        )
    })

    // 根据子分类得到渲染节点
    const  vNodeType = resourcesType.map((item: any) => {
        return (
            <Option value={item.id} key={item.id}>{item.resourcesName}</Option>
        )
    })

    return (
        <div className={style['add-container']}>
            <Col className={style['col']}>
                <Card title="增加大分类" hoverable>
                    <Card className={style['card']} hoverable>
                        <Button
                            type={"primary"}
                            className={style['card-button']}
                            onClick={() => {
                                const data = classificationName.trim()
                                if (!data) return message.error('大分类名称不能为空!')
                                postClassification({
                                    type: data,
                                    uid: props.user.spreadCode
                                }).then(resp => {
                                    if (resp.data.state === 'success') {
                                        setLock(!lock)
                                        setClassificationName('')
                                        return message.success('新增大分类成功!')
                                    } else {
                                        return message.error(`新增大分类失败!`)
                                    }
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                    <Card className={style['card']} hoverable>
                            <label>大分类名称: <Input
                                    className={style['card-input']}
                                    value={classificationName}
                                    allowClear
                                    onChange={e => {
                                        setClassificationName(e.target.value)
                                    }}
                                />
                            </label>
                    </Card>
                </Card>
            </Col>
            <Col className={style['col']}>
                <Card title="增加子分类" hoverable>
                    <Card className={style['card']} hoverable>
                        <Button
                            type={"primary"}
                            className={style['card-button']}
                            onClick={() => {
                                const data = resourcesTypeName.trim()
                                if (!data) return message.error('子分类分类名称不能为空!')
                                postResourcesType({
                                    name: data,
                                    id: classificationKey,
                                    uid: props.user.spreadCode
                                }).then(resp => {
                                    if (resp.data.state === 'success') {
                                        setLock(!lock)
                                        setResourcesTypeName('')
                                        return message.success('新增子分类成功!')
                                    } else {
                                        return message.error(`新增子分类失败!`)
                                    }
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                    <Card className={style['card']} hoverable>
                        <label className={style['card-label']}>
                            目标大分类: <Select
                                defaultValue={classificationKey}
                                style={{ width: 120 }} onChange={(key) => {
                                    setClassificationKey(key)
                                }}
                            >
                                {vNodeClass}
                            </Select>
                        </label>
                        <label className={style['card-label']}>
                            子分类名称: <Input
                                className={style['card-type-input']}
                                value={resourcesTypeName}
                                allowClear
                                onChange={e => {
                                    setResourcesTypeName(e.target.value)
                                }}
                            />
                        </label>
                    </Card>
                </Card>
            </Col>
            <Col className={style['resources-col']}>
                <Card title="增加资源" hoverable>
                    <Card className={style['card']} hoverable>
                        <Button
                            type={"primary"}
                            className={style['card-button']}
                            onClick={() => {
                                const name = resourcesName.trim()
                                const url = resourcesUrl.trim()
                                const image = resourcesImage.trim()
                                const introduce = resourcesIntroduce.trim()
                                const tags = resourcesTags.join('|')
                                if (!name || !url || !image || !introduce || !tags) {
                                    return message.error('请填写完整的资源信息!')
                                }
                                const data = {
                                    name,
                                    url,
                                    image,
                                    introduce,
                                    tags,
                                    id: resourcesTypeKey,
                                    uid: props.user.spreadCode
                                }
                                postResources(data).then(resp => {
                                    if (resp.data.state === 'success') {
                                        setLock(!lock)
                                        setResourcesName('')
                                        setResourcesUrl('')
                                        setResourcesImage('')
                                        setResourcesIntroduce('')
                                        setResourcesTags([])
                                        return message.success('新增资源成功!')
                                    } else {
                                        return message.error(`新增资源失败!`)
                                    }
                                })
                            }}
                        >
                            保存
                        </Button>
                    </Card>
                    <Card className={style['card']} hoverable>
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                目标子分类:
                            </span>
                            <Select
                                defaultValue={resourcesTypeKey}
                                style={{ width: 120 }} onChange={(key) => {
                                    setResourcesTypeKey(key)
                                }}
                            >
                                {vNodeType}
                            </Select>
                        </label>
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                资源名称:
                            </span>
                            <Input
                                allowClear
                                value={resourcesName}
                                className={style['card-type-input']}
                                onChange={(e) => {
                                    setResourcesName(e.target.value)
                                }}
                            />
                        </label>
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                资源地址:
                            </span>
                            <Input
                                allowClear
                                value={resourcesUrl}
                                className={style['card-type-input']}
                                onChange={(e) => {
                                    setResourcesUrl(e.target.value)
                                }}
                            />
                        </label>
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                资源图片:
                            </span>
                            <Input
                                allowClear
                                value={resourcesImage}
                                className={style['card-type-input']}
                                onChange={(e) => {
                                    setResourcesImage(e.target.value)
                                }}
                            />
                            <Tooltip placement="top" title="使用账户默认图片">
                                <Button
                                    className={style['input-tip']}
                                    icon={<ToolOutlined />}
                                    onClick={() => {
                                        setResourcesImage(props.user.imgUrl)
                                    }}
                                />
                            </Tooltip>
                        </label>
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                资源描述:
                            </span>
                            <Input
                                allowClear
                                value={resourcesIntroduce}
                                className={style['card-type-input']}
                                onChange={(e) => {
                                    setResourcesIntroduce(e.target.value)
                                }}
                            />
                        </label>
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                资源标签:
                            </span>
                            <Select
                                mode="tags"
                                className={style['card-type-input']}
                                onSelect={(key) => {
                                    const data = [...resourcesTags, key]
                                    setResourcesTags(data)
                                }}
                                onDeselect={(key) => {
                                    const index = resourcesTags.indexOf(key)
                                    const data = resourcesTags.splice(index, 1)
                                    setResourcesTags(data)
                                }}
                            ></Select>
                        </label>
                    </Card>
                </Card>
            </Col>
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () => ({}))(Component);