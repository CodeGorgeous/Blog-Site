import React from 'react'

interface Props {
    children?: any
}

const Component: React.FC = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default Component


