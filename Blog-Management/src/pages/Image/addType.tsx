import React, { useState } from 'react'
import style from './css/addtype.less'
import { Col, Card, Button, Input, message, Tooltip } from 'antd'
import { postImageType } from '../../api/index'
import { connect } from 'umi'
import { UploadOutlined, ToolOutlined } from '@ant-design/icons'

interface Props {
    user?: any
    children?: any
}

const Component = (props: Props) => {

    const [typeName, setTypeName] = useState('')
    const [image, setImage] = useState('')

    return (
        <div>
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
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () => ({}))(Component);