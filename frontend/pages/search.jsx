import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { SearchManga } from '../wailsjs/wailsjs/go/main/App';


const Search = () => {
   const [searchResults, setSearchResults] = useState([])


   const [query, setQuery] = useState('');
   const [debouncedQuery, setDebouncedQuery] = useState(query);
   const router = useRouter()


   const onSearch = (query) => {
      SearchManga(query).then(res => {
         setSearchResults(res.mangaList)
      })
   }

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedQuery(query);
         clearTimeout(handler);
      }, 400);

      return () => {
         clearTimeout(handler);
      };
   }, [query]);

   useEffect(() => {
      if (debouncedQuery) {
         onSearch(debouncedQuery);
      } else {
         setSearchResults([]);
      }
   }, [debouncedQuery]);

   const handleChange = (e) => {
      setQuery(e.target.value);
   };



   return (
      <>

         <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0;" />
         </Head>
         <Navbar highlited="/search"  />


         <div className='search_container'>
            <input
               type="text"
               value={query}
               onChange={handleChange}
               className='search_inut'
               placeholder='Search manga...'
            />
            <div className="search_result" id='mangas'>
               {
                  searchResults && searchResults.length > 0 &&
                  <div className="mangas__cards-container">
                     {searchResults.map((elem, index) =>
                        <motion.div
                           onClick={() => router.push(`/manga/${elem.id}`)}
                        key={index + elem.id} className='card_thing'>
                           <img src={elem.image} alt="cover" style={{ height: 250, width: 200 }} /> <br />
                           {trimExtra(elem.title, 30)}
                        </motion.div>
                     )}
                  </div>
               }
            </div>
         </div>

      </>
   )
}

export default Search;

const trimExtra = (str, len) => {
   if (str.length > len) {
      return str.slice(0, len) + '...'
   }
   return str
}