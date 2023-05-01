
import React, {useState, useEffect}  from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

import { useStyles } from './ModalEditRoyalties.style'
import { RoyaltyAddress } from './RoyaltyAddress'

import { Modal } from '@/common/Modal'
import { useAppSelector } from '@/hooks/useStoreHooks'
import { API_URL } from '@/utils/contract'
import { setRoyalties } from '@/utils/contract-adapter'

interface Props {
    open: boolean,
    onClose?: () => void,
    address: string,
    collection:any,
}

export type Rows = {
    address: string,
    value: string,
}

function ModalEditRoyalties (props:Props): JSX.Element{
    const {open, onClose, address, collection} = props
    const classes = useStyles()
    const [rows, setRows] = useState([{ address: '', value: '' }])
    const [errorMsg, setErrorMsg] = useState('')
    const [pending, setPending] = useState(false)
    const [success, setSuccess] = useState(false)
    const { accessToken } = useAppSelector(state => state.globalReducer)

    console.log(collection)

    useEffect(()=>{
        if (address){
            setRows([{ address: address, value: '' }])
        }
    }, [address])

    const closeModal = () => {
        onClose && onClose()
        setSuccess(false)
        setPending(false)
    }


    const handleAddRow = () => {
        setRows([...rows, { address: '', value: '' }])
    }

    const handleDeleteRow = (index: number) => {
        const newRows = [...rows]
        newRows.splice(index, 1)
        setRows(newRows)
        setErrorMsg('')
    }

    const handleAddressChange = (event: { target: { value: any } }, index: string | number) => {
        const { value } = event.target
        const newRows = [...rows]
        newRows[index].address = value
        setRows(newRows)
    }

    const handleValueChange = (event: { target: { value: any } }, index: string | number) => {
        const { value } = event.target
        const newRows = [...rows]
        newRows[index].value = value
        setRows(newRows)
        setErrorMsg('')
    }

    const resetDBRoyalties = async() =>{
        await fetch(`${API_URL()}/api/token-collections/${collection.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data:{
                    volume: 0
                }
            })
        })
    }

    const handleConfirm = async() => {
        const sum = rows.reduce((acc, row) => acc + Number(row.value), 0)
        const hasDecimal = rows.some((row) => /\.\d+$/.test(row.value))

        for (let i = 0; i < rows.length; i++) {
            if (!rows[i].address || !rows[i].value) {
                setErrorMsg('Please fill out all the fields')
                return
            }
            let address = rows[i].address

            for (let j = i; j<rows.length;j++){
                if (j == i)
                    continue
                if (address.toLowerCase() == rows[j].address.toLowerCase()){
                    setErrorMsg('Please remove duplicate addresses')
                    return
                }
            }
        }

        if (hasDecimal) {
            setErrorMsg('Values cannot be decimal.')
        } else if (sum > 100) {
            setErrorMsg('The sum of all values cannot exceed 100.')
        } else {
            setErrorMsg('')
            setPending(true)
            try{
                await setRoyalties(collection.collectionAddress, rows)
                await resetDBRoyalties()
                setPending(false)
                setSuccess(true)
            }
            catch(err){
                setPending(false)
                setErrorMsg('Transaction rejected')
            }
        }
    }

    return(
        <Modal open={open} onClose={closeModal} className={classes.modal}>
            {!success ? <Container>
                <h1>Add royalties</h1>
                <p>Add royalties to one or multiple addresses</p>
                {rows.map((row, index) => (
                    <InputContainer key={'Royalties_' + index}>
                        <input
                            className="primary"
                            type="text"
                            placeholder="Address"
                            value={row.address}
                            onChange={(event) => handleAddressChange(event, index)}
                        />
                        <div className='wrap'>
                            <div className='inputWrap'>
                                <input
                                    type="text"
                                    placeholder="Percentage of royalties"
                                    value={row.value}
                                    onChange={(event) => handleValueChange(event, index)}
                                />
                                <p>%</p>
                            </div>

                            {index != 0 ? <CloseIcon onClick={() => handleDeleteRow(index)}>X</CloseIcon> : <></>}
                        </div>

                    </InputContainer>
                ))}
                {errorMsg ? <Error>{errorMsg}</Error> : <></>}
                <Confirmation>
                    <ButtonContainer primary onClick={()=>handleAddRow()}>Add Address</ButtonContainer>
                    {!pending ? <ButtonContainer onClick={()=> handleConfirm()}>Confirm Royalties</ButtonContainer> : <ButtonContainer noHover><CircularProgress style={{ height:'16px', width:'16px'}}/></ButtonContainer>}
                </Confirmation>
            </Container>

                :
                <Container>
                    <h1>Royalties set succesfully!</h1>
                    <ButtonContainer primary onClick={()=>closeModal()}>Close</ButtonContainer>
                </Container>
            }
        </Modal>
    )
}

export {ModalEditRoyalties}

const Container = styled.div`

    >p{
        margin:20px 0px;
        margin-bottom:30px;
    }
`

const Error = styled.div`
    margin-top:22px;
    color:red;
    font-weight:bold;
`

const InputContainer = styled.div`
    display:flex;
    flex:1;
    margin-top:8px;

    >input{
        font-size:16px;

        padding: 10px;
        flex:0.5;
        margin: 0 10px;
        border-radius:12px;
        border:1px solid #e6e7e9;
        background-color: #e6e7e9;
        transition:all 0.2s linear;
        outline: none;
        width:100%;

        :focus{
            background-color:white;
        }
        :hover{
            border:1px solid grey;
        }

    }
    .wrap{
        align-items:center;
        display:flex;
        flex:0.5;
        
        .inputWrap{
            align-items:center;
            font-size:16px;
            display:flex;
            border-radius:12px;
            transition:all 0.2s linear;
            border: 1px solid #e6e7e9;
            background-color:#e6e7e9;

            :hover{
                border:1px solid grey;
            }

            >input{
                border-radius:12px;
                background-color:#e6e7e9;
                font-size:16px;
                outline: none;
                transition:all 0.2s linear;
                border:none;
                padding: 10px;
                width:100%;
                :focus{
                    background-color:white;
                }
            }
            >p{

                padding:10px;
            }
            :focus-within{
                background-color:white;

            }
            
        }
        >.MuiSvgIcon-root{
                border:1px solid #e6e7e9;
                border-radius:12px;
                padding: 6px;
                margin-left:12px;
                :hover{
                    cursor:pointer;
                    opacity:0.7;
                }
        }
    }
`

const Confirmation = styled.div`
    display:flex;
    flex-direction:column;

`

const ButtonContainer = styled.div`
    text-align:center;
    padding:14px 0px;
    margin-top:${(props:any) => props.primary ? '30px' : '12px'};
    width:100%;
    color: ${(props:any) => props.primary ? 'white' : '#0C2039'};
    background-color: ${(props:any)=>props.primary ? '#2639ed' : 'white'};
    border:1px solid #e6e7e9;
    border-radius:12px;
    transition:0.3s all ease;


    :hover{
        color: ${(props:any) => props.primary ? 'white' : 'white'};
        background-color: ${(props:any)=>props.primary ? '#0C2039' : '#0C2039'};
        background-color: ${(props:any)=>props.noHover ? 'white' : '#0C2039'};
        cursor:${(props:any)=>props.noHover ? '' : 'pointer'};;

    }
`