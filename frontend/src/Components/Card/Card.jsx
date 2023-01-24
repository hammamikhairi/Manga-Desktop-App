import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import Image from '../Image/Image';
import TypeWriter from '../TypeWriter/TypeWriter';

const  Card = ({props}) => {

  const {cover, japaneseTitle, title, description, id} = props

  return (
    <motion.div
      initial={{
        opacity : 0
      }}
      animate={{
        opacity : 1
      }}
      transition={{type:'spring', duration:1}}
    >
      <ButtonBase
        onClick={() => { console.log(id); document.dispatchEvent(new CustomEvent("reading", {detail : `${id}/ch1`}))}}
      >
        <Paper
          sx={{
            p: 1,
            margin: 'auto',
            maxWidth: 500,
            minWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item sx={{height : 250, width : 200}}>
              <Image
                url={cover}
                alt={title + " cover"}
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <TypeWriter
                    type="h1"
                    className="card__japanese-title card__text"
                    content={japaneseTitle}
                  />
                  <TypeWriter
                    type="h1"
                    className="card__title card__text"
                    content={title}
                  />
                  <TypeWriter
                    delay={5}
                    type="p"
                    className="card__text"
                    content={description}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>
    </motion.div>
  );
}

export default Card;