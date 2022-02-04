export interface IResponse {
    data: any
    msg: string
    state: 'success' | 'fail'
}


export interface IRenderData {
    path: string
    name: string
    icon: React.ReactNode
    onClick: (target: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export interface IUser {
    id: number,
    name: string,
    password: string,
    spreadCode: string,
    powerLevel: number,
    imgUrl: string,
    isLogin: boolean
}

export interface IRoutes {
    key: string
    title: string
    icon: React.ReactNode
    children?: IRoutes[]
}
