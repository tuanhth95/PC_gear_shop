import styled from 'styled-components'
import { Input } from 'antd'
export const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;
    height: 600px;
`
export const StyleInput = styled(Input)`
    width: 300px;
`
export const StyleInputPassword = styled(Input.Password)`
    width: 300px;
`

export const StyleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 600px;
    margin: 1% 10%;
    border: 2px solid #1A93FF;
    border-radius: 25px;
`

export const StyleLeftCon = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #1A93FF; 
`


export const StyleRightCon = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
`