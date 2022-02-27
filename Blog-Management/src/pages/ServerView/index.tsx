import React, { useState, useEffect } from 'react';
import { getServeMessage } from '@/api';
import { connect } from 'umi';
import { IUser, IServerData } from '@/types/interfaces';
import { Card, Progress, Button  } from 'antd';
import style from './index.less';
import { ReloadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

interface IProps {
    user: IUser
}

const Component: React.FC<IProps> = (props) => {

    const [serverMessage, setServerMessage] = useState<IServerData>({
        systemIdleMemory: 0,
        systemOperationHours: 0,
        systemTotalMemory: 1,
        systemType: 'Windows10 Server',
        systemVersion: '1.0.0'
    });

    const [lock, setLock] = useState<boolean>(false);
    const [first, setFirst] = useState<number>(0);

    useEffect(() => {
      const timer = setInterval(() => {
          setServerMessage({
              ...serverMessage,
              systemOperationHours: ++ serverMessage.systemOperationHours
          });
      }, 1000)
      return () => {
          clearInterval(timer);
      }
    }, [first])
    
    useEffect(() => {
        getServeMessage(props.user.spreadCode).then((resp: any) => {
            const result: IServerData = resp.data;
            setServerMessage(result);
            setFirst(first + 1);
        })
    }, [lock])
    
    // echarts-for-react所需数据
    const options = {
        grid: { top: 8, right: 10, bottom: 24, left: 36 },
        xAxis: {
          type: 'category',
        //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [1, 10 , 200, 120, 210, 20, 30],
            type: 'line',
            smooth: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
      };

    return (
        <div>
            <Card
                className={style['server-container']}
                title={(
                    <>
                        <h3 style={{
                            display: 'inline-block',
                            margin: 0
                        }}>服务器概览</h3>
                        <Button
                            type="link"
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                setLock(!lock);
                            }}
                        />
                    </>
                )}
            >
                <Card
                    className={style['card-container']}
                    title="系统信息"
                >
                    <div>
                        <span>服务器安装系统: </span>
                        <span>{ serverMessage.systemType }</span>
                    </div>
                    <div>
                        <span>服务器系统版本: </span>
                        <span>{ serverMessage.systemVersion }</span>
                    </div>
                    <div>
                        <span>服务器运行时间: </span>
                        <span>{ serverMessage.systemOperationHours }s</span>
                    </div>
                </Card>
                <Card
                    className={style['card-container']}
                    title="内存使用情况"
                >
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={
                            Math.ceil(
                                (
                                    serverMessage.systemIdleMemory
                                    /
                                    serverMessage.systemTotalMemory
                                ) * 100
                            )
                        }
                    />
                </Card>
            </Card>
            <Card
                title="网站访问量"
            >
                <ReactECharts
                    option={options}                    
                />
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
