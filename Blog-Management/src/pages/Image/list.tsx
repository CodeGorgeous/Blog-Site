import React, { useState, useEffect, useRef } from 'react'
import ManageHeader from '@/components/ManageHeader'
import { Table, Button, Modal, Upload, message } from 'antd'
import { getAllFile, deleteFile } from '@/api/index'
import { EResponseState, IRenderData, IFileData } from '@/types/interfaces'
import { CloudUploadOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'
import Clipboard  from 'clipboard';

interface IProps {}

const Component: React.FC<IProps> = (props) => {
    
    const [loadingLock, setLoadingLock] = useState<boolean>(false);
    const [dataList, setDataList] = useState([]);
    const [typeList, setTypeList] = useState<{text: string, value: string}[]>([])
    const [doMain, setDoMain] = useState<string>('');
    const [lock, setLock] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    useEffect(() => {
        getAllFile().then((resp: any) => {
            if (resp.state === EResponseState.success) {
                const set = new Set<string>();
                const newFileListData = resp.data.fileData.map((item: any) => {
                    // 顺路拼凑出一个文件类型数组
                    set.add(item.fileType);
                    return {
                        ...item,
                        key: item.id
                    }
                })
                const newTypeList = [...set].map((item) => {
                    return {
                        text: item,
                        value: item
                    }
                })
                setDataList(newFileListData);
                setDoMain(resp.data.domain);
                setTypeList(newTypeList);
            }
        })
    }, [lock, fileList])
    
    const renderData: IRenderData[] = [{
        path: '',
        name: '上传文件',
        icon: <CloudUploadOutlined />,
        onClick: () => {
            // TODO: 打开一个对话框, 对话框内用于上传文件, 当上传过程中用户关闭窗口则无视关闭操作
            setModalVisible(true);
        }
    }];

    const handleOk = () => {
        setModalVisible(false);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };

    const onChange = (info: IFileData) => {
        setFileList(info.fileList);
        const { status } = info.file;
        if (status == 'done') { // 任务上传结束, 需要根据服务器返回进一步推动结果
          switch (info.file.response.state) {
            case EResponseState.success:
              const newFileList1 = fileList.map(item => {
                if (item.uid === info.file.uid) {
                  return {
                    ...item,
                    status: 'success' as 'success',
                    url: info.file.response.data.domain + info.file.response.data.url
                  }
                } else {
                  return item;
                }
              })
              setFileList(newFileList1);
              break;
            case EResponseState.fail || EResponseState.error:
              const newDefaultFileList2 = fileList.map(item => {
                if (item.uid === info.file.uid) {
                  return {
                    ...item,
                    status: 'error' as 'error',
                    url: ''
                  }
                } else {
                  return item;
                }
              })
              setFileList(newDefaultFileList2);
              break;
          }
        } else if (status == 'error') {}
      }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            fixed: true,
            align: 'center' as 'center',
            width: 50,
        }, {
            title: '文件名称',
            dataIndex: 'fileOriginName',
            align: 'center' as 'center',
            width: 300,
        }, {
            title: '文件地址',
            dataIndex: 'fileUrl',
            align: 'center' as 'center',
            render: (text: string, record: any) => {
                const url = `${doMain}${text}`;
                return (
                    <>
                        <Button
                            type="link"
                            target="_blank"
                            href={url}    
                        >
                            跳转
                        </Button>
                        <Button
                            className="btn-copy-link"
                            type="link"
                            data-url={url}
                        >
                            复制
                        </Button>
                        {/* TODO: 貌似有点无解, 浏览器策略是能打开就打开, 打不开再执行下载, 网上普遍观察到的是下载压缩后的文件 */}
                        <Button
                            type="link"
                        >
                            下载
                        </Button>
                    </>
                )
            }
        }, {
            title: "文件类型",
            dataIndex: 'fileType',
            align: 'center' as 'center',
            filters: typeList,
            onFilter: (value: any, record: any) => {
                return value === record.fileType;
            }
        }, {
            title: '操作',
            dataIndex: 'options',
            align: 'center' as 'center',
            render: (text: string, record: any) => {
                return (
                    <>
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => {
                                // TODO: 发送删除请求
                                deleteFile(record.id).then((resp: any) => {
                                    if (resp.state === EResponseState.success) {
                                        message.success('删除成功');
                                        setLock(!lock);
                                    } else {
                                        message.error('删除失败, 请稍后重试');
                                    }
                                })
                            }}
                        />
                    </>
                )
            }
        }
    ];
    
    const oBtnAll = document.querySelectorAll('.btn-copy-link')
    for (const oBtn of oBtnAll) {
        const cli = new Clipboard(oBtn, {
            text: function(target) {
                const string: string | null = target.getAttribute('data-url');
                return string ?? '';
            }
        })
    }

    return (
        <div>
            <ManageHeader renderData={renderData}/>
            <Table
                loading={loadingLock}
                columns={columns}
                dataSource={dataList}
                pagination={{
                    pageSize: 10
                }}
            />
            <Modal
                title="上传文件"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Upload.Dragger
                    name='file'
                    action='http://codegorgeous.top:2551/upload'
                    fileList={fileList}
                    method={"post" as 'post'}
                    onChange={onChange}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p>点击上传文件或者拖拽文件到这里</p>
                </Upload.Dragger>
            </Modal>
        </div>
    )
}

export default Component;