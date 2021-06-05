import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ countries }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [items] = useState(countries)
  const [error, setError] = useState(null)
  const [q, setQ] = useState('')
  const [searchParam] = useState(['capital', 'name'])
  const [filterParam, setFilterParam] = useState(['All'])
  // console.log(countries)

  useEffect(() => {
    if (countries) {
      setIsLoaded(true)
    }
    return () => { }
  }, [])

  function search(items) {
    return items.filter(((item) => {

      if (item.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        })
      } else if (filterParam == 'All') {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        })
      }


    }))
  }



  if (!isLoaded) {
    return (
      <div>
        <Head>
          <title>Search Countries</title>
          <meta name="Search Countries" content="a list of countries data" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>loading</h1>
      </div>)
  } else {
    return (
      <div className={styles.wrapper}>
        <Head>
          <title>Search Countries</title>
          <meta name="Search Countries" content="a list of countries data" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.search_wrapper}>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className={styles.search_input}
              placeholder="Search countries..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {/* <span className={styles.sr_only}>Search countries here</span> */}
          </label>

          <div className={styles.select}>
            <select
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              className={styles.custom_select}
              aria-label="Filter Countries By Region"
            >
              <option value="All">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <span className={styles.focus}></span>
          </div>


        </div>


        <ul className={styles.card_grid}>
          {search(items).map((item) => (
            <li key={item.name}>
              <article className={styles.card} key={item.callingCodes}>
                <div className={styles.card_image}>
                  <Image src={item.flag} alt={item.name} width={250} height={250} objectFit='contain' />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_name}>{item.name}</h2>
                  <ol className={styles.card_list}>
                    <li>
                      population:{" "}
                      <span>{item.population}</span>
                    </li>
                    <li>
                      Region: <span>{item.region}</span>
                    </li>
                    <li>
                      Capital: <span>{item.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>


      </div>
    )
  }



}

export async function getStaticProps() {
  const countries = await fetch("https://restcountries.eu/rest/v2/all").then(res => res.json())

  if (!countries) {
    return {
      notfound: true,
    }
  }

  return {
    props: { countries }
  }
}
