import React, { useState, useEffect } from 'react'
import { connect } from 'umi'
import { Col, Card, Select, Image, Button, Tooltip, message, Modal } from 'antd'
import style from './css/list.less'
import { getAllImage, getImageType, searchImage, deleteImage } from '@/api'
import { ToolOutlined, DeleteColumnOutlined } from '@ant-design/icons'
import ClipboardJS from 'clipboard'

interface Props {
    user?: any
    children?: any
}

const { Option } = Select
const { confirm } = Modal;

const Component: React.FC = (props: Props) => {
    // 图片分类
    const [typeList, setTypeList] = useState<any>([])
    // 图片总数
    const [total, setTotal] = useState(0)
    // 图片
    const [dataList, setDataList] = useState<any>([])
    // 当前选中的分类
    const [selectType, setSelectType] = useState(0)
    // 是否重新渲染页面
    const [lock, setLock] = useState(false)
    useEffect(() => {
        getImageType().then(resp => {
            const data = [{
                id: 0,
                type: '全部',
                uid: 'admin'
            }, ...resp.data.data]
            setTypeList(data)
        })
    }, [])

    // 根据selectType的变化拿取相应的数据
    useEffect(() => {
        if (selectType === 0) {
            getAllImage().then(resp => {
                setTotal(resp.data.data.count)
                setDataList(resp.data.data.rows)
            })
        } else {
            searchImage(selectType).then(resp => {
                setTotal(resp.data.data.length)
                setDataList(resp.data.data)
            })
        }
    }, [selectType, lock])

    // 根据分类生成节点
    const vTypeNode = typeList.map((item: any) => {
        return (
            <Option key={item.id} value={item.id}>{item.type}</Option>
        )
    })

    // 根据图片生成节点
    const vImageNode = dataList.map((item: any) => {
        return (
            <Card
                className={style['card-image-container']}
                key={item.id}
                hoverable
            >
                <Image
                    placeholder
                    src={item.imgUrl}
                />
                <p style={{
                    'textAlign': 'center'
                }}>
                    <Tooltip placement="top" title="复制图片地址">
                        <Button
                            className={`${style['input-tip']} cli-btn`}
                            icon={<ToolOutlined />}
                            onClick={() => {
                                new ClipboardJS('.cli-btn', {
                                    text: () => {
                                        return item.imgUrl
                                    }
                                })
                            }}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="删除">
                        <Button
                            danger
                            className={style['input-tip']}
                            icon={<DeleteColumnOutlined />}
                            onClick={() => {
                                if (props.user.powerLevel <= 1) return message.error('删除失败: 用户权限不足')
                                confirm({
                                    title: '删除确认',
                                    content: `是否确定删除${item.name}这张图片?`,
                                    onOk() {
                                        deleteImage({
                                            id: item.id,
                                            uid: props.user.spreadCode
                                        }).then(resp => {
                                            if (resp.data.state === 'success') {
                                                setLock(!lock)
                                                message.success('删除成功')
                                            } else {
                                                message.error(resp.data.msg)
                                            }
                                        })
                                    },
                                    cancelText: '取消',
                                    okText: '确定'
                                })
                            }}
                        />
                    </Tooltip>
                </p>
            </Card>
        )
    })
    
    return (
        <div className={style['list-container']}>
            <Col>
                <Card
                    className={style['card-container']}
                    hoverable
                >
                    <Select
                        value={selectType}
                        style={{ width: 120 }}
                        onChange={(key) => {
                            setSelectType(key)
                        }}
                    >
                        {vTypeNode}
                    </Select>
                </Card>
            </Col>
            <Col className={style['card-col']}>
                <Card
                    className={style['card-container']}
                    hoverable
                >
                    <p className={style['card-total']}>当前图片总数量: {total}</p>
                    <Image.PreviewGroup>
                        {vImageNode}
                    </Image.PreviewGroup>
                </Card>
            </Col>
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () =>({}))(Component)
