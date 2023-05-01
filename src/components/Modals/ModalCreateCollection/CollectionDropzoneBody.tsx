import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Button, Grid, Typography } from '@mui/material'

import { useStyles } from './ModalCreateCollection.style'



export const CustomDropzoneBody = ({open}: { open(): void }) => {
    const classes = useStyles()

    return <Grid container direction="column" alignItems="center">
        <Grid container justifyContent="center" alignItems="center" className={classes.dropzoneButtonWrp}>
            <Button onClick={open} variant="contained" component="span" className={classes.dropzoneButton}>
                <Grid container justifyContent="center" alignItems="center"className={classes.iconWrp} px={1.5}>
                    <AddIcon />
                </Grid>
            </Button>
        </Grid>
        <Grid container direction="column" justifyContent="center" className={classes.dropzoneTextWrp}>
            <Typography className={classes.dropFileHint} align="center">We recommend an image of at least 300x300. Gifs work too.</Typography>
            <Typography className={classes.dropFileMaxSize} align="center">Max. File Size: <span className={classes.maxSizeVal}>5 MB</span></Typography>
        </Grid>
    </Grid>
}