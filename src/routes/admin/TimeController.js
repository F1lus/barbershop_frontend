import { Grid, TextField, createTheme, ThemeProvider, FormControlLabel, Checkbox, Typography } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const days = [
    'Hétfő', 'Kedd', 'Szerda',
    'Csütörtök', 'Péntek', 'Szombat',
    'Vasárnap'
]

export default function TimeController({ row, handleDayChange, index }) {

    return (
        <Grid container justifyContent='center'>
            <Grid item sm={12} md={8} lg={6} container justifyContent='center' spacing={2} sx={{ mb: 7 }}>
                <ThemeProvider theme={theme}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography
                            component='h5'
                            variant="h5"
                            sx={{ textAlign: 'center', mt: 3 }}
                        >
                            { days[row.day-1] }
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            name='openhr'
                            type="number"
                            label='Nyitás (Óra)'
                            value={row.openhr}
                            onChange={e => handleDayChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                            disabled={row.active === 0}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            name='openmin'
                            type="number"
                            label='Nyitás (Perc)'
                            value={row.openmin}
                            onChange={e => handleDayChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                            disabled={row.active === 0}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            name='closehr'
                            type="text"
                            label='Zárás (Óra)'
                            value={row.closehr}
                            onChange={e => handleDayChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                            disabled={row.active === 0}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            name='closemin'
                            type="number"
                            label='Zárás (Perc)'
                            value={row.closemin}
                            onChange={e => handleDayChange(e, index)}
                            color="warning"
                            variant='filled'
                            fullWidth
                            autoComplete='off'
                            disabled={row.active === 0}
                            required
                        />
                    </Grid>

                    <Grid container item xs={12} md={12} lg={3} justifyContent='center'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="active"
                                    checked={row.active === 1}
                                    onChange={e => handleDayChange(e, index)}
                                />
                            }
                            label="Ezen a napon dolgozok"
                        />
                    </Grid>
                </ThemeProvider>
            </Grid>

        </Grid>
    )

}