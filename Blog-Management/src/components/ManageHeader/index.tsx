import React from 'react';
import { IRenderData } from '@/types/interfaces';
import { Button, Card } from 'antd';
import style from './index.less';

interface IProps {
    renderData: IRenderData[]
}

const Component: React.FC<IProps> = (props) => {
    // 根据数组渲染
    const nodes = props.renderData.map((item, index) => {
        return (
            <Button
                className={style['btn']}
                icon={item.icon}
                key={index}
                onClick={item.onClick}
            >
                {item.name}
            </Button>
        )
    })
    return (
        <Card
            className={style['manage-container']}
        >
            {nodes}
        </Card>
    )
}

export default Component;