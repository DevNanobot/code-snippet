import React, { useEffect, useState } from 'react'

import { Typography, Grid, Button } from '@mui/material'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { useStyles } from './TokenBid.style'

import { Avatar } from '@/common/Avatar'

interface Props {
    tokenBid:any
    setSelectedBid:(a:any)=>void,
    onBuy:()=>void,
    isOwner:boolean,
    me:any,
    setCheckoutType:(a:number)=>void,
    setOpenRemoveBid:any,
    typeToken:string,
    validBid:boolean
}

export function TokenBid(props: Props): JSX.Element {
    const classes = useStyles()

    const {tokenBid, setSelectedBid, onBuy, isOwner, me, setCheckoutType, setOpenRemoveBid, typeToken, validBid }= props
    const [name, setName] = useState('')

    useEffect(()=>{

        if (tokenBid.bidder.username.length>15)
        {
            let modifiedStr = tokenBid.bidder.username.substring(0, 5) + '...' + tokenBid.bidder.username.substring(tokenBid.bidder.username.length-5, tokenBid.bidder.username.length-1)
            setName(modifiedStr)
        }
        else
            setName(tokenBid.bidder.username)
    }, [tokenBid.bidder.username])

    if (tokenBid.price == '0' || tokenBid.price == 0){
        return  <></>
    }


    return (
        <Grid container wrap="nowrap" className={classes.TokenBidContainer}>
            <Avatar alt="Avatar" sx={{width: 50, height: 50}} src={tokenBid.bidder.profilePicture?.url} />

            <Grid container direction="column" justifyContent="center" className={classes.infoSection}>
                <Grid container>
                    <Typography className={validBid ? classes.bidSection : clsx(classes.bid, 'cancelled')}>
                        <span >{tokenBid.price} wETH</span>
                        <span className={classes.by}> by </span>
                        <Link to ={`/profile/${tokenBid.bidder.customUrl}`} className={classes.userName}>
                            {name}
                        </Link>

                    </Typography>
                </Grid>
                <Grid container wrap='nowrap' sx={{mt: '10px'}}>

                    {typeToken =='multiple' && tokenBid.amount>1 && <Typography  className={classes.date}>per token for {tokenBid.amount} tokens</Typography>}
                    {typeToken =='multiple' && tokenBid.amount==1 && <Typography  className={classes.date}>per token for {tokenBid.amount} token</Typography>}

                </Grid>
            </Grid>

            {isOwner && tokenBid.bidder.publicAddress != me?.publicAddress && validBid &&
                <Button
                    variant="contained"
                    color="primary"
                    sx={{pl:3, pr:3}}
                    onClick={()=>
                    {
                        setSelectedBid(tokenBid)
                        setCheckoutType(2)
                        onBuy()
                    }}
                >
                        Accept Bid
                </Button>}

            {me?.publicAddress == tokenBid.bidder.publicAddress ?
                <Button
                    variant="contained"
                    color="primary"
                    sx={{pl:3, pr:3}}
                    onClick={()=>
                    {
                        setOpenRemoveBid(tokenBid)
                    }}
                >
                Remove Bid
                </Button>
                :<></>
            }
        </Grid>
    )
}
