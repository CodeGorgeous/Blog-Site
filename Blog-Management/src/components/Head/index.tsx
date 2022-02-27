import React, { useState } from 'react'
import { Button, Drawer } from 'antd';
import { connect } from 'umi'
import style from './index.less'

interface IProps {
    user: any
    onSignOut?: any
}

const Component:React.FC<IProps> = (props) => {

    const [Lock, setLock] = useState(false)

    return (
        <div className={style['header-container']}>
            <span className={style['title-container']}>
                <span className={style['title']}>后台数据中心</span>
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
                    <p>用户id: {props.user.id}</p>
                    <p>用户名: {props.user.name}</p>
                    <p>用户权限等级: {props.user.powerLevel}</p>
                    <p>专属邀请码: {props.user.spreadCode}</p>
                    <p></p>
                    <p>
                        <Button
                            type={"primary"}
                            onClick={() => {
                                props.onSignOut && props.onSignOut()
                            }}
                            danger
                        >登出</Button>
                    </p>
                </Drawer>
            </span>
        </div>
    )
}

export default connect((state: any) => {
    return {
        user: state.user
    }
}, (dispatch: any) => {
    return {
        onSignOut() {
            dispatch({
                type: 'user/asyncSignOut'
            })
        }
    }
})(Component)
