import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from '../Image/Image';
import TypeWriter from '../TypeWriter/TypeWriter';

const  Card = ({props, status}) => {

  const {
    cover,
    title,
    id
  } = props

  const [renderProg, setRenderProg] = useState(false)
  useEffect(() => { 
    if (status != undefined) {
      const type = setInterval(() => {
        setRenderProg(true)
        clearInterval(type)
      }, 1000)
    }
  }, [])
  
  return (
    <motion.div
      initial={{
        opacity : 0
      }}
      animate={{
        opacity : 1
      }}
      transition={{type:'spring', duration:1}}
      className="card_thing"
    >
      <ButtonBase
        onClick={() => { document.dispatchEvent(new CustomEvent("reading", {detail : `${id}/ch1`}))}}
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
                <Grid item xs className="card__text_container">

                  <TypeWriter
                    type="h1"
                    className="card__title card__text"
                    content={title}
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