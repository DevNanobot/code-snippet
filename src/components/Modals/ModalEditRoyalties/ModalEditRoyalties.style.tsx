import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles((theme) => ({
    modal: {
        '& .modalContainer': {
            maxWidth: 587,
            width: '100%',
            textAlign: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
            boxSizing: 'border-box',
            [theme.breakpoints.down('sm')]: {
                width: 335,
                padding: '50px 20px'
            },
            '& .MuiFilledInput-root': {
                border: '1px solid #222',
                padding: '22px'
            },
            '& .MuiFilledInput-input': {
                borderRadius: '0',
                background: 'transparent'
            }
        }
    }
}))
