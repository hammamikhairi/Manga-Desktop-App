
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Card from '../../Components/Card/Card';
import './mangas.sass';

const tempData = [
  {
    "title" : "chainsaw man",
    "japaneseTitle" : "チェンソーマン",
    "cover" : "https://www.chainsaw-man-manga.online/wp-content/uploads/2021/07/CHAINSAW-MAN_2.png",
    "id" : "csm",
    "description" : "The story is set in a world where Devils cause harm to humans, which makes them a target for extermination. Denji is a young, depressed man who has sold several of his organs and works as a tree cutter and devil hunter."
  },
  {
    "title" : "Dr. Stone",
    "japaneseTitle" : "ドクターストーン",
    "cover" : "https://stone-dr.com/wp-content/uploads/2021/12/US_Volume_19-1-683x1024.png",
    "id" : "drstn",
    "description" : "One fateful day, all of humanity was petrified by a blinding flash of light. After several millennia, high schooler Taiju awakens and finds himself lost in a world of statues."
  },
  {
    "title" : "Jujutsu kaisen",
    "japaneseTitle" : "呪術廻戦",
    "cover" : "https://i.imgur.com/qFqh97r.jpg",
    "id" : "jjk",
    "description" : "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman's school to be able to locate the demon's other body parts and thus exorcise himself."
  },
  {
    "title" : "chainsaw man",
    "japaneseTitle" : "チェンソーマン",
    "cover" : "https://www.chainsaw-man-manga.online/wp-content/uploads/2021/07/CHAINSAW-MAN_2.png",
    "id" : "8",
    "description" : "The story is set in a world where Devils cause harm to humans, which makes them a target for extermination. Denji is a young, depressed man who has sold several of his organs and works as a tree cutter and devil hunter."
  },
  {
    "title" : "chainsaw man",
    "japaneseTitle" : "チェンソーマン",
    "cover" : "https://www.chainsaw-man-manga.online/wp-content/uploads/2021/07/CHAINSAW-MAN_2.png",
    "id" : "99",
    "description" : "The story is set in a world where Devils cause harm to humans, which makes them a target for extermination. Denji is a young, depressed man who has sold several of his organs and works as a tree cutter and devil hunter."
  },
]


const  Mangas = () => {
  return (
    <div id="mangas">
      <motion.div
        id="bgMangas"
        initial={{
          filter: "blur(0px)"
        }}
        animate={{
          filter: "blur(7px)"
        }}
        transition={{type:'spring', duration:1}}
      />
      <div className="mangas__cards-container">
        <Grid  container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {tempData.map((elem, index) =>
            <Grid key={elem.id} className="flexed" item xs={6}>
                <Card props={elem} />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Mangas;