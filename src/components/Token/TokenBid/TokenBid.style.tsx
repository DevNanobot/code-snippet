import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => {
    return {
        TokenBidContainer: {
            padding: '8px',
            borderRadius: '20px',
            background: theme.palette.common.white
        },
        infoSection: {
            paddingLeft: '31px',
            [theme.breakpoints.down('md')]: {
                paddingLeft: '17px'
            },
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '15px'
            }
        },
        bidSection: {
            fontSize: '16px',
            fontWeight: 700,
            [theme.breakpoints.down('md')]: {
                fontSize: '14px'
            }
        },
        bid: {
            '&.cancelled': {
                textDecoration: 'line-through',
                color: theme.palette.secondary.dark
            }
        },
        by: {
            color: theme.palette.secondary.dark
        },
        userName: {
            marginRight: '16px',
            textDecoration: 'none',
            fontWeight: 700,
            color: theme.palette.primary.dark
        },
        date: {
            fontSize: '14px',
            color: theme.palette.secondary.dark,
            [theme.breakpoints.down('md')]: {
                fontSize: '12px'
            }
        },
        floorBid: {
            marginLeft: '16px',
            fontSize: '14px',
            fontWeight: 700,
            color: theme.palette.primary.dark,
            textDecoration: 'none',
            [theme.breakpoints.down('md')]: {
                marginLeft: '10px',
                fontSize: '12px'
            }
        }
    }
})

export { useStyles }
