import React, { useState, useEffect} from 'react'
import { Menu } from 'antd';
import {
    BarsOutlined,
    ReadOutlined,
    ToTopOutlined,
    ToolOutlined,
    RestOutlined
} from '@ant-design/icons';
import { history } from 'umi'

const Component: React.FC = () => {
    
    return (
        <div>
            <Menu
                defaultSelectedKeys={['/blog/list']}
                defaultOpenKeys={['blog']}
                mode="inline"
                theme="dark"
                onSelect={({key}) => {
                    history.push(key)
                }}
                >
                <Menu.SubMenu
                    key="blog"
                    title="博客管理"
                    icon={<ReadOutlined />}
                >
                    <Menu.Item
                        key="/blog/list"
                        icon={<BarsOutlined />}
                    >博客列表</Menu.Item>
                    <Menu.Item
                        key="/blog/add"
                        icon={<ToTopOutlined />}
                    >新增博客</Menu.Item>
                    <Menu.Item
                        key="/blog/put"
                        icon={<ToolOutlined />}
                    >修改博客</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="image"
                    title="图片管理"
                    icon={<ReadOutlined />}
                >
                    <Menu.Item
                        key="/image/list"
                        icon={<BarsOutlined />}
                    >图片列表</Menu.Item>
                    <Menu.Item
                        key="/image/add"
                        icon={<ToTopOutlined />}
                    >新增图片</Menu.Item>
                    <Menu.Item
                        key="/image/delete"
                        icon={<RestOutlined />}
                    >删除图片</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}

export default Component
