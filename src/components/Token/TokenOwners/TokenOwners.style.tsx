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
        floorBid: {
            paddingRight: '12px',
            color: theme.palette.secondary.dark
        },
        userSection: {
            fontSize: '14px',
            fontWeight: 400,
            color: theme.palette.primary.main,
            [theme.breakpoints.down('md')]: {
                fontSize: '12px'
            }
        },
        userName: {
            marginRight: '16px',
            textDecoration: 'none',
            fontWeight: 700,
            color: theme.palette.primary.dark
        },
        by: {
            color: theme.palette.secondary.dark
        },
        date: {
            fontSize: '14px',
            [theme.breakpoints.down('md')]: {
                fontSize: '12px'
            }
        }
    }
})

export { useStyles }
