import React from 'react'

const Component: React.FC = (props) => {
    return (
        <div>
            博客
            {props.children}
        </div>
    )
}

export default Component
