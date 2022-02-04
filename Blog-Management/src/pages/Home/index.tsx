import React, { useState } from 'react'
import style from './index.less'
import { Layout } from 'antd';
import Side from '@/components/Side/index'
import Head from '@/components/Head/index'

const { Header, Sider, Content } = Layout;

const Component: React.FC = (props) => {

  const [toggle, setToggle] = useState(false);

  const onChangeToggle = () => {
    setToggle(!toggle);
  }

  return (
    <div className={style['home-container']}>
      <Layout className={style['home-container']}>
        <Header>
          <Head />
        </Header>
        <Layout>
          <Sider
            collapsed={toggle}
          >
            <Side
              toggle={toggle}
              onChangeToggle={onChangeToggle}
            />
          </Sider>
          <Content className={style['home-content']}>{props.children}</Content>
        </Layout>
      </Layout>
    </div>  
  );
}

export default Component
