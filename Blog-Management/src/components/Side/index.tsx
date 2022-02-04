import React from 'react'
import { Menu, Button } from 'antd';
import {
    BarsOutlined,
    ReadOutlined,
    TeamOutlined,
    FileImageOutlined,
    NotificationOutlined,
    SnippetsOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ApartmentOutlined
} from '@ant-design/icons';
import { history } from 'umi';
import { IRoutes } from '@/types/interfaces';
import style from './index.less';

interface IProps {
    toggle: boolean
    onChangeToggle: () => void
}

const { SubMenu, Item } = Menu;
const Component: React.FC<IProps> = (props) => {

    const routesSide: IRoutes[] = [
        {
            key: 'blog',
            title: '管理中心',
            icon: <BarsOutlined />,
            children: [
                {
                    key: '/blog/list',
                    title: '博客管理',
                    icon: <ReadOutlined />
                },
                {
                    key: '/blog/type',
                    title: '博客分类管理',
                    icon: <ApartmentOutlined />
                },
                {
                    key: '/image/list',
                    title: '图片管理',
                    icon: <FileImageOutlined />
                },
                {
                    key: '/image/type',
                    title: '图片分类管理',
                    icon: <ApartmentOutlined />
                },
                {
                    key: '/other/title',
                    title: '标语管理',
                    icon: <NotificationOutlined />
                },
                {
                    key: '/user/list',
                    title: '用户管理',
                    icon: <TeamOutlined />
                }
            ]
        }
    ];

    const vNodes = routesSide.map(item => {
        if (item.children) {
            const vChildrenNodes = item.children.map(cItem => {
                return (
                    <Item
                        key={cItem.key}
                        icon={cItem.icon}
                    >
                        {cItem.title}
                    </Item>
                )
            })
            return (
                <SubMenu
                    key={item.key}
                    title={item.title}
                    icon={item.icon}
                >
                    {vChildrenNodes}
                </SubMenu>
            )
        } else {
            return (
                <Item
                        key={item.key}
                        icon={item.icon}
                    >
                        {item.title}
                    </Item>
            )
        }
        
    })

    return (
        <div>
            <div className={style['btn-container']}>
                <Button
                    className={style['btn']}
                    icon={props.toggle ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    type="primary"
                    onClick={props.onChangeToggle}
                    style={{ marginBottom: 16 }}
                />
            </div>
            <Menu
                defaultSelectedKeys={['/blog/list']}
                defaultOpenKeys={['blog']}
                mode="inline"
                theme="dark"
                onSelect={({key}) => {
                    history.push(key)
                }}
            >
                {vNodes}
            </Menu>
        </div>
    )
}

export default Component;

/*
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
                        key="/blog/type"
                        icon={<SnippetsOutlined />}
                    >分类管理</Menu.Item>
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
                        icon={<FileAddOutlined />}
                    >新增图片</Menu.Item>
                    <Menu.Item
                        key="/image/type"
                        icon={<SnippetsOutlined />}
                    >分类管理</Menu.Item>
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
 */
