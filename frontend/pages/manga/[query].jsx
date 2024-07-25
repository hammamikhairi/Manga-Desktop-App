import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { GetManga } from '../../wailsjs/wailsjs/go/main/App';


// imageUrl: string;
// name: string;
// author: string;
// status: string;
// updated: string;
// view: string;
// genres: string[];
// chapterList: ServiceChapter[];

const MangaData = () => {

   const router = useRouter()

   const [manga, setManaga] = useState(null)

   useEffect(() => {
      GetManga(router.query.query).then(res => {
         setManaga(res)
      })
   }, [] )

   return (
      <>

         <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0;" />
         </Head>
         <Navbar highlited="" />


         <div className='search_container'>
            {
               manga&&
               <div className="manga_data">
                  <img src={manga.imageUrl} alt="manga.img" />
                  <div className='manga_meta'>
                     <div className='manga_things'>
                        <h1>{manga.name}</h1>
                        <h3><span>By : </span>{manga.author}</h3>
                        <h4><span>Status : </span>{manga.status}</h4>
                        <h5><span>Genre :</span> {manga.genres.join(" ")}</h5>
                     </div>
                     <br />
                     <div className="chapters_listsss">
                        {
                           manga.chapterList.map((elem, index) => 
                              <div 
                                 onClick={() => router.push(`/read/${router.query.query}/${elem.id}`)}
                              key={index + elem.id + router.query.query} className='chapter'>
                                 <h5>{elem.name.replace("\n", "").trim()}</h5>
                              </div>
                           )
                        }
                     </div>
                  </div>
               </div>
            }
         </div>

      </>
   )
}

export default MangaData;
