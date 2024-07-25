
import { Grid } from '@mui/material';
import Card from '../Card/Card'
import './mangaslist.sass'

const MangasList= ({mangas, status}) => {
  
  return (
      <div className="mangas__cards-container">
        <Grid  container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {mangas.map((elem, index) =>
            <Grid key={elem.id} className="flexed" item xs={6}>
                <Card props={elem} status={status ? { Progress : 20, Total : 30} : undefined } />
            </Grid>
          )}
        </Grid>
      </div>
  )
}

export default MangasList