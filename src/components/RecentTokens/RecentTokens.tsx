import React, { useState, useEffect, useRef } from 'react'

import { Typography, Grid, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import { useStyles } from './RecentTokens.style'

import { TokenCard } from '@/components/Token/TokenCard'
import { TokenCardSkeleton } from '@/components/Token/TokenCardSkeleton'
import { TokenEntity, TokenModelType } from '@/entities/Token.entity'
import { useGetTokens } from '@/hooks/graphql/useGetTokens'

export function RecentTokens(): JSX.Element {
    const classes = useStyles()
    const { refetch } = useGetTokens()
    const [tokens, setTokens] = useState<TokenEntity[]>([])
    const tokenListEl = useRef<HTMLDivElement>()
    const pageSize = 7

    useEffect(() => {
        const fetchAllTokens = async function () {
            setTokens([])
            const { data } = await refetch({
                filters: {
                    creator: {
                        id: {
                            notNull: true
                        }
                    }
                },
                pagination: { pageSize },
                sort: 'createdAt:desc'
            })
            const tokenEntities = data?.tokens.data.map((token: TokenModelType) => new TokenEntity(token))
            setTokens(tokenEntities)
        }
        fetchAllTokens()
    }, [refetch])

    const tokenPreviews = tokens.map((token: TokenEntity) => (
        <TokenCard tokenData={token} className={classes.tokenCard} key={'TokenCard_' + token.id} />
    ))

    const tokenSkeletons = [...Array(pageSize)].map((e, i) => (
        <TokenCardSkeleton className={classes.tokenCard} key={'TokenCardSkeleton_' + i}/>
    ))

    const onMouseScroll = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        const { scrollLeft } = e.currentTarget

        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft = scrollLeft + 294
        } else {
            e.currentTarget.scrollLeft = scrollLeft - 294
        }
    }

    useEffect(() => {
        if (tokenListEl.current) {
            tokenListEl.current.addEventListener('mousewheel', onMouseScroll)
        }
    }, [])

    return (
        <Box className={classes.recentTokens}>
            <Grid container wrap="nowrap" alignItems="center" className={classes.recentTokensGrid}>
                <Box className={classes.textWrp}>
                    <Typography className={classes.title} color="secondary" noWrap>Recent NFTs</Typography>
                    <Button to="/search?tab=items" component={Link} variant="contained" color="primary" className={classes.viewAllBtn} >
                    View All
                    </Button>
                </Box>
                <Box className={`${classes.tokenListContainer} dark-scroller`} ref={tokenListEl}>
                    <Grid
                        className={classes.tokenListGrid}
                        container
                        gap={3}
                        wrap="nowrap"
                    >
                        {tokens.length ? tokenPreviews : tokenSkeletons }
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}