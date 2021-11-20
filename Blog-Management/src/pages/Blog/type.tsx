import React, { useState } from 'react'
import style from './css/type.less'
import { Col, Card, Button, Input, message } from 'antd'
import { postBlogType } from '../../api/index'
import { connect } from 'umi'
import { UploadOutlined } from '@ant-design/icons'

interface Props {
    user?: any
    children?: any
}

const Component = (props: Props) => {

    const [typeName, setTypeName] = useState('')

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
        </div>
    )
}

export default connect((store: any) => {
    return {
        user: store.user
    }
}, () => ({}))(Component);