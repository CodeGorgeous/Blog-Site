import React from 'react'
import style from './index.less'
import { Layout } from 'antd';
import Side from '@/components/Side/index'
import Head from '@/components/Head/index'

const { Header, Sider, Content } = Layout;

const Component: React.FC = (props) => {
  return (
    <div className={style['home-container']}>
      <Layout className={style['home-container']}>
        <Header><Head /></Header>
        <Layout>
          <Sider><Side /></Sider>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </div>  
  );
}

export default Component
