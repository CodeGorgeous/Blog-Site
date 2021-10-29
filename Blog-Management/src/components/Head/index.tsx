import React, { useState } from 'react'
import { Avatar, Button, Drawer } from 'antd';
import { history } from 'umi'
import style from './index.less'

const Component:React.FC = () => {

    const [Lock, setLock] = useState(false)

    return (
        <div className={style['header-container']}>
            <span className={style['title-container']}>
                <Avatar
                    className={style['title-avatar']}
                    src={'http://qiniu.codegorgeous.top/Avatar.jpg'}
                    size={40}
                />
                <span className={style['title-text']}>
                    个人管理后台中心
                </span>
            </span>
            <span>
                <Button
                    type={"primary"}
                    onClick={() => setLock(!Lock)}
                >用户信息</Button>
                <Drawer
                    title="用户信息面板"
                    placement="right"
                    onClose={() => setLock(!Lock)}
                    visible={Lock}
                >
                    <p>用户名: CodeGorgeous</p>
                    <p>用户权限等级: 6</p>
                    <p></p>
                    <p>
                        <Button
                            type={"primary"}
                            onClick={() => {
                                history.push('/login')
                            }}
                            danger
                        >登出</Button>
                    </p>
                </Drawer>
            </span>
        </div>
    )
}

export default Component
