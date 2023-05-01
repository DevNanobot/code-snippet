import React, { useEffect, useState } from 'react'

import { Typography, Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import { useStyles } from './TokenOwners.style'

import { Avatar } from '@/common/Avatar'

interface Props {
    tokenOrder:any
    setOrder:any,
    onBuy:()=>void,
    me:any,
    setCheckoutType:any,
}

export function TokenOwners(props:Props): JSX.Element {
    const classes = useStyles()

    const {tokenOrder, setOrder, onBuy, me, setCheckoutType} = props
    const [name, setName] = useState('')

    useEffect(()=>{
        try{
            if (tokenOrder.purchaser.username.length>15)
            {
                let modifiedStr = tokenOrder.purchaser.username.substring(0, 5) + '...' + tokenOrder.purchaser.username.substring(tokenOrder.purchaser.username.length-5, tokenOrder.purchaser.username.length-1)
                setName(modifiedStr)
            }
            else
                setName(tokenOrder.purchaser.username)
        }
        catch(err){}
    }, [tokenOrder.purchaser.username])

    return (
        <Grid container wrap="nowrap" className={classes.TokenBidContainer}>
            <Avatar alt="Avatar" sx={{width: 50, height: 50}} src={tokenOrder.purchaser.profilePicture?.url} />

            <Grid container direction="column" justifyContent="center" className={classes.infoSection}>
                <Grid container>
                    <Typography className={classes.bidSection}>
                        <span className={classes.floorBid}>On sale for</span>
                        {tokenOrder.price} ETH
                    </Typography>
                </Grid>
                <Grid container direction="row" wrap='nowrap' sx={{mt: '11px'}} className={classes.userSection}>
                    <span className={classes.by}>{tokenOrder.remaining}/{tokenOrder.amount}&nbsp;</span>
                    <span className={classes.by}>by&nbsp;</span>
                    <Link to={`/profile/${tokenOrder.purchaser.customUrl}`} className={classes.userName}>{name}</Link>
                    <Typography className={classes.date}>{tokenOrder.date}</Typography>
                </Grid>
            </Grid>
            {tokenOrder.purchaser.publicAddress == me?.publicAddress ?
                <>
                </>
                :
                <Button
                    variant="contained"
                    color="primary"
                    sx={{pl:3, pr:3}}
                    onClick={()=>
                    {
                        setOrder(tokenOrder)
                        setCheckoutType(1)
                        onBuy()
                    }}
                >
                    Buy
                </Button>
            }
        </Grid>
    )
}
