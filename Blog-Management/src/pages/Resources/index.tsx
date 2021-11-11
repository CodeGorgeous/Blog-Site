import React from 'react'

interface Props {
    children?: any
}

const Component = (props: Props) => {
    return (
        <>
            {props.children}
        </>
    )
}

export default Component
