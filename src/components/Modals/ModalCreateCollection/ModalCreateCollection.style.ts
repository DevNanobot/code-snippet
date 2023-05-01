import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    modal: {
        '& > .modalContainer': {
            maxWidth: '718px',
            width: '100%',
            height: '70vh',
            [theme.breakpoints.down('md')]: {
                height: '95vh',
                boxSizing: 'border-box'
            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: '95%',
                height: '95vh'
            }
        }
    },
    formContainer: {
        paddingLeft: 24,
        paddingRight: 24,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 20,
            paddingRight: 20
        }
    },
    createBtn: {
        fontSize: 16,
        fontWeight: 400,
        margin: '0 auto',
        padding: '17px 21.5px',
        marginTop: 72,
        [theme.breakpoints.down('sm')]: {
            marginTop: 64
        }
    },
    maxSizeVal: {
        fontWeight: 700
    },
    textField: {
        marginTop: 32,
        [theme.breakpoints.down('sm')]: {
            marginTop: '24px!important'
        }
    },
    dropzone: {
        margin: '40px auto 30px',
        maxWidth: 330,
        width: '100%',
        padding: '0!important',
        '& .dragAndDropContainer': {
            padding: '28px 40px 40px'
        },
        '& .controlsWrp': {
            textAlign: 'left'
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 300,
            marginBottom: 16
        }
    },
    dropzoneButtonWrp: {
        width: 130,
        height: 130,
        borderRadius: 10,
        backgroundColor: theme.palette.common.white
    },
    dropzoneButton: {
        minWidth: 50,
        width: 50,
        height: 50
    },
    iconWrp: {
        border: 'solid 1px',
        borderRadius: 10,
        borderColor: theme.palette.common.white
    },
    dropFileHint: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 700,
        lineHeight: '24px',
        [theme.breakpoints.down('sm')]: {
            marginTop: 24,
            fontSize: 18
        }
    },
    dropFileMaxSize: {
        marginTop: 20,
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            marginTop: 24
        }
    },
    dropzoneTextWrp: {
        color: theme.palette.secondary.dark
    }
}))
