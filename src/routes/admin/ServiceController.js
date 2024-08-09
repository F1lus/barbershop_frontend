import { Grid, TextField, createTheme, ThemeProvider, Button, Divider } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export default function ServiceController({ row, handleServiceChange, onSave, index, onDelete }) {

    return (
        <Grid container justifyContent='center'>
            <Grid item sm={12} md={8} lg={6} container justifyContent='center' spacing={2} mb={5}>
                <ThemeProvider theme={theme}>
                    <Grid item xs={12} md={12} lg={12}>
                        <TextField
                            name='type'
                            type="text"
                            label='Megnevezés'
                            value={row.type}
                            onChange={e => handleServiceChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            name='price'
                            type="number"
                            label='Ár'
                            value={row.price}
                            onChange={e => handleServiceChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            name='time'
                            type="number"
                            label='Idő (percben)'
                            value={row.time}
                            onChange={e => handleServiceChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                        />
                    </Grid>
                </ThemeProvider>
                <Grid item lg={12} container direction='row' spacing={2} justifyContent='flex-end'>
                    <Grid item direction='row' justifyContent='flex-end'>
                        <Button variant="contained" color='success' onClick={onSave}>Mentés</Button>
                    </Grid>
                    <Grid item direction='row' justifyContent='flex-end'>
                        <Button variant="contained" color='error' onClick={() => onDelete(index)}>Törlés</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
        </Grid>
    )

}