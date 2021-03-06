import React from 'react'
import { Menu, Button } from 'antd';
import {
    BarsOutlined,
    ReadOutlined,
    TeamOutlined,
    FileImageOutlined,
    NotificationOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ApartmentOutlined,
    HomeOutlined,
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
            key: '/serverView',
            title: '服务信息',
            icon: <HomeOutlined />
        }, {
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
                    title: '七牛云文件管理',
                    icon: <FileImageOutlined />
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
