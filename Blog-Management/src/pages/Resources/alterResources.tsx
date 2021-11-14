import React, { useState, useEffect } from 'react'
import style from './css/alterResources.less'
import { Row, Card, Button, Input, Select, Tooltip, message } from 'antd'
import { ToTopOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons'
import { connect, history } from 'umi'
import { getAllResourcesType, getSearchResource, putResource } from '../../api/index'
interface Props {
    children?: any
    user?: any
}

const { Option } = Select

const Component: React.FC= (props: Props) => {

    const historyState: any = history.location.state

    const [searchKeyWord, setSearchKeyWord] = useState('')
    // 资源id
    const [resourcesId, setResourcesId] = useState('')
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
    const [resourcesTypeKey, setResourcesTypeKey] = useState(1)

    // 所有子分类
    const [type, setType] = useState<any>([])

    useEffect(() => {
        getAllResourcesType().then(resp => {
            let data: any[] = []
            resp.data.data.forEach((item: any) => {
                data = [...data, ...item.ResourcesTypes]
            })
            setType(data)
        })

        if (historyState) {
            setResourcesId(historyState.id)
            setResourcesName(historyState.name)
            setResourcesUrl(historyState.url)
            setResourcesImage(historyState.image)
            setResourcesIntroduce(historyState.introduce)
            setResourcesTags(historyState.tags.split('|'))
            setResourcesTypeKey(historyState.resources_id)
        }

    }, [])

    // 将子分类转换为节点
    const vNode = type.map((item: any) => {
        return (
            <Option value={item.id} key={item.id}>{item.resourcesName}</Option>
        )
    })

    return (
        <div>
            <Row>
                <Card className={style['card']} hoverable>
                    <Input
                        className={style['card-input']}
                        value={searchKeyWord}
                        placeholder={"请输入资源id"}
                        onChange={e => {
                            setSearchKeyWord(e.target.value)
                        }}
                    />
                    <Button
                        type="primary"
                        className={style['card-button']}
                        onClick={() => {
                            // 搜索资源
                            if (!searchKeyWord) return message.error('资源id不能为空!')
                            if (typeof +searchKeyWord !== 'number') return message.error('资源id只能为数字!')
                            getSearchResource({
                                id: +searchKeyWord,
                                uid: props.user.spreadCode
                            }).then(resp => {
                                if (resp.data.state === 'success') {
                                    const data = resp.data.data
                                    setResourcesId(data.id)
                                    setResourcesName(data.name)
                                    setResourcesUrl(data.url)
                                    setResourcesImage(data.image)
                                    setResourcesIntroduce(data.introduce)
                                    setResourcesTags(data.tags.split('|'))
                                    setResourcesTypeKey(data.resources_id)
                                    message.success('查询成功!')
                                } else {
                                    message.error(resp.data.msg)
                                }
                            })
                        }}
                    >
                        <SearchOutlined />搜索
                    </Button>
                    <Button
                        type="primary"
                        className={style['card-button']}
                        style={{
                            display: resourcesId === '' ? 'none' : 'inline-block'
                        }}
                        onClick={() => {
                            const data = {
                                id: +resourcesId,
                                name: resourcesName,
                                url: resourcesUrl,
                                image: resourcesImage,
                                typeId: resourcesTypeKey,
                                introduce: resourcesIntroduce,
                                tags: resourcesTags.join('|'),
                                uid: props.user.spreadCode
                            }
                            putResource(data).then(resp => {
                                if (resp.data.state === 'success') {
                                    setResourcesId('')
                                    setResourcesName('')
                                    setResourcesUrl('')
                                    setResourcesImage('')
                                    setResourcesIntroduce('')
                                    setResourcesTags([])
                                    setResourcesTypeKey(1)
                                    return message.success('修改成功!')
                                }
                                return message.error(resp.data.msg)
                            })
                        }}
                    >
                        <ToTopOutlined />保存
                    </Button>
                </Card>
            </Row>
            <Row>
                <Card className={style['card']} hoverable>
                    <p
                        className={style['card-text']}
                        style={{
                            display: resourcesId === '' ? 'block' : 'none'
                        }}
                    >
                        请搜索资源
                    </p>
                    <div
                        style={{
                            display: resourcesId === '' ? 'none' : 'block'
                        }}
                    >
                        <label className={style['card-label']}>
                            <span className={style['card-span']}>
                                目标子分类:
                            </span>
                            <Select
                                value={resourcesTypeKey}
                                style={{ width: 120 }}
                                onChange={(key) => {
                                    setResourcesTypeKey(key)
                                }}
                            >
                                {vNode}
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
                                value={resourcesTags}
                                className={style['card-type-input']}
                                onSelect={(key) => {
                                    const data = [...resourcesTags, key]
                                    setResourcesTags(data)
                                }}
                                onDeselect={(key) => {
                                    const data = [...resourcesTags]
                                    data.splice(data.indexOf(key), 1)
                                    setResourcesTags(data)
                                }}
                            ></Select>
                        </label>
                    </div>
                </Card>
            </Row>
        </div>
    )
}

export default connect(
    (store: any) => {
        return {
            user: store.user
        }
    },
    () => ({})
)(Component);