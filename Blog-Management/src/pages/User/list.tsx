import React, { useState, useEffect } from 'react'
import { message, Table, Image, Switch } from 'antd'
import style from './css/list.less'
import { getAllUser } from '@/api/user'
import { AlertOutlined } from '@ant-design/icons'
import { connect } from 'umi'
import { IResponseUserData, IRenderData } from '../../types/interfaces'
import ManageHeader from '../../components/ManageHeader/index'
import { imageFall } from '../../utils/base64Imgs';

interface IProps {
    user: any
}

const Component: React.FC<IProps> = (props) => {

    const [lock, setLock] = useState<boolean>(false);
    const [list, setList] = useState<IResponseUserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      setLoading(true);
      getAllUser(props.user.spreadCode).then((resp: any) => {
        setLoading(false);
        if (resp.state == 'success') {
          const list: IResponseUserData[] = resp.data.list.map((item: any) => {
            return {
              ...item,
              key: item.id
            }
          });
          setList(list);
        } else {
          message.error('获取数据失败, 请稍后重新进行尝试');
        }
      });
    }, [])

    // 头部
    const renderData: IRenderData[] = [
      {
        path: '',
        name: '图一乐按钮',
        icon: <AlertOutlined />,
        onClick: () => {
          message.info('呜呜呜~~~, 你不要再按了...')
        }
      }
    ];

    // 表格
    const columns = [
      {
        title: 'ID',
        align: 'center' as 'center',
        dataIndex: 'id',
        width: 50,
        fixed: 'left' as 'left',
      }, {
        title: '用户名',
        align: 'center' as 'center',
        dataIndex: 'name',
        width: 100
      }, {
        title: '邀请码',
        align: 'center' as 'center',
        dataIndex: 'spreadCode',
        width: 80
      }, {
        title: '占位图',
        align: 'center' as 'center',
        dataIndex: 'occupyImgUrl',
        width: 200,
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
        title: '创建时间',
        align: 'center' as 'center',
        dataIndex: 'createdAt',
        width: 100
      }, {
        title: '渠道邀请码',
        align: 'center' as 'center',
        dataIndex: 'code',
        width: 100
      },{
        title: '封禁',
        align: 'center' as 'center',
        dataIndex: 'ban',
        width: 100,
        render: () => {
          return (<Switch checkedChildren="开启" unCheckedChildren="关闭" />)
        }
      }, {
        title: '操作',
        align: 'center' as 'center',
        dataIndex: 'options',
        width: 100,
        fixed: false,
        render: () => {
          return (<>操作</>)
        }
      },
    ];

    return (
        <div>
          <ManageHeader renderData={renderData} />
          <Table
                columns={columns}
                dataSource={list}
                loading={loading}
                pagination={{
                    pageSize: 10
                }}
                scroll={{ y: window.innerHeight - 310 }}
            />
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, () => ({}))(Component)
