import React, { useState, useEffect} from 'react'
import { Menu } from 'antd';
import {
    BarsOutlined,
    ReadOutlined,
    ToTopOutlined,
    ToolOutlined,
    RestOutlined,
    SearchOutlined,
    TeamOutlined,
    UserOutlined,
    FileImageOutlined,
    FolderOpenOutlined,
    SubnodeOutlined,
    NotificationOutlined
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
                    <Menu.Item
                        key="/blog/lock"
                        icon={<SearchOutlined />}
                    >查看博客</Menu.Item>
                    <Menu.Item
                        key="/blog/type"
                        icon={<ToTopOutlined />}
                    >新增分类</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="image"
                    title="图片管理"
                    icon={<FileImageOutlined />}
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
                        key="/image/type"
                        icon={<ToTopOutlined />}
                    >新增分类</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="resources"
                    title="资源管理"
                    icon={<FolderOpenOutlined />}
                >
                    <Menu.Item
                        key="/resources/list"
                        icon={<BarsOutlined />}
                    >资源列表</Menu.Item>
                    <Menu.Item
                        key="/resources/add"
                        icon={<ToTopOutlined />}
                    >新增功能</Menu.Item>
                    <Menu.Item
                        key="/resources/alterResources"
                        icon={<ToolOutlined />}
                    >修改资源</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="user"
                    title="用户管理"
                    icon={<UserOutlined />}
                >
                    <Menu.Item
                        key="/user/list"
                        icon={<TeamOutlined />}
                    >用户列表</Menu.Item>
                    <Menu.Item
                        key="/user/alterUser"
                        icon={<ToolOutlined />}
                    >修改信息</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="other"
                    title="其他管理"
                    icon={<SubnodeOutlined />}
                >
                    <Menu.Item
                        key="/other/title"
                        icon={<NotificationOutlined />}
                    >标语管理</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}

export default Component
