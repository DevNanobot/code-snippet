import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => {
    return {
        recentTokens: {
            width: '100%',
            padding: '106px 0 94px',
            background: theme.palette.primary.main,
            [theme.breakpoints.down('sm')]: {
                boxSizing: 'border-box',
                paddingRight: 20,
                paddingLeft: 20
            }
        },
        recentTokensGrid: {
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse'
            }
        },
        textWrp: {
            marginLeft: 120,
            [theme.breakpoints.down('md')]: {
                marginLeft: 60
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: 30,
                marginLeft: 0,
                textAlign: 'center'
            }
        },
        title: {
            width: '100%',
            fontSize: 36,
            fontWeight: 600,
            [theme.breakpoints.down('sm')]: {
                fontSize: 28
            }
        },
        viewAllBtn: {
            padding: '20px 40px',
            marginTop: 32
        },
        tokenListContainer: {
            marginLeft: 106,
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
            paddingBottom: 57,
            [theme.breakpoints.down('md')]: {
                marginLeft: 56
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginLeft: 0
            }
        },
        tokenListGrid: {
            width: 'fit-content'
        },
        tokenCard: {
            minWidth: 270,
            maxWidth: 270
        }
    }
})

export { useStyles }
