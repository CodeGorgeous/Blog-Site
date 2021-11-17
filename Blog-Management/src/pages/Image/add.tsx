import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Upload, Modal, Button, message, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect, history } from 'umi'
import { postImage, getImageType } from '@/api'
import style from './css/add.less'

interface Props {
    user?: any
    children?: any
}

const { Option } = Select

const Component: React.FC = (props: Props) => {

    const [fileList, setFileList] = useState<any>([])
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [typeList, setTypeList] = useState<any>([])
    const [selectType, setSelectType] = useState(1)

    useEffect(() => {
        getImageType().then(resp => {
            setTypeList(resp.data.data)
        })
    }, [])

    const vTypeNode = typeList.map((item: any) => {
        return (
            <Option key={item.id} value={item.id}>{item.type}</Option>
        )
    })

    // 获取图片base64格式数据
    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    
    return (
        <div>
            <Col>
                <Card className={style['card-container']} hoverable>
                    <span className={style['card-type']}>
                        <span className={style['card-type-text']}>分类:</span>
                        <Select
                            value={selectType}
                            style={{ width: 120 }}
                            onChange={(key) => {
                                setSelectType(key)
                            }}
                        >
                            {vTypeNode}
                        </Select>
                    </span>
                    <Button
                        type="primary"
                        onClick={async() => {
                            const image = await Promise.all(fileList.map(async(item: any) => {
                                const base64 = await getBase64(item.originFileObj);
                                return {
                                    name: item.name,
                                    imageBase64: base64
                                }
                            }))
                            const mes = {
                                image,
                                type: selectType,
                                uid: props.user.spreadCode
                            }
                            postImage(mes).then(resp => {
                                if (resp.data.state === 'success') {
                                    // history.push('/image/list')
                                    return message.success('新增成功!')
                                } else {
                                    return message.error(`新增失败: 失败原因: ${resp.data.msg}`)
                                }
                            })
                        }}
                    >
                        上传
                    </Button>
                </Card>
            </Col>
            <Col>
                <Card className={style['card-container']} hoverable>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={async ({file, fileList, event}) => {
                            setFileList(fileList)
                        }}
                        onPreview={async(file) => {
                            const base: any = await getBase64(file.originFileObj)
                            setPreviewVisible(true)
                            setPreviewTitle(file.name)
                            setPreviewImage(base)
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={() => {
                            setPreviewVisible(false)
                            setPreviewTitle('')
                            setPreviewImage('')
                        }}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Card>
            </Col>
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component)


