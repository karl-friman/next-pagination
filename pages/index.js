import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router';
import { filmLinks, getTitles } from '../shared/films';
import FilmFilter from '../components/FilmFilter';

const Home = (props) => {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const [checkedState, setCheckedState] = useState(
    new Array(props.titles.length).fill(true)
  );

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const paginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    content = (
      <ul>
        {props.posts.map((character, id) => {
          //let disabledFilms = ;
          let characterInFilms = '';
          let spanStyle = '';
          let shouldBeActive = false;

          character.films.map((film) => {
            if (filmLinks[film]) {
              let filmId = filmLinks[film].valueOf();
              let checkedStateId = filmId - 1;
              //characterInFilms += filmLinks[film].valueOf();
              characterInFilms += filmId; // + ':' + film + '' + props.titles[filmId - 1];
              // if (filmLinks[film].valueOf() == disabledFilm) {
              //   spanStyle = 'disabledCharacter';
              // }

              console.log('Checked state:', checkedState);
              console.log(
                'Current state:',
                filmId,
                checkedState[checkedStateId]
              );
              if (checkedState[checkedStateId]) {
                shouldBeActive = true;
              }
            }
          });
          if (!shouldBeActive) {
            spanStyle = 'disabledCharacter';
          }
          return (
            <li key={id} className={spanStyle}>
              {character.name} : {characterInFilms}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className='container'>
      <h1>Posts List with Pagination in Next.js</h1>
      <FilmFilter
        titles={props.titles}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
      />
      <div className='posts'>{content}</div>

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        activeClassName={'active'}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        initialPage={props.currentPage - 1}
        pageCount={props.pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={paginationHandler}
      />
    </div>
  );
};

Home.getInitialProps = async ({ query }) => {
  const returnsPerPage = 10;
  const page = query.page || 1;
  const posts = await axios.get(`https://swapi.dev/api/people?page=${page}`);

  return {
    totalCount: posts.data.count,
    pageCount: Math.ceil(posts.data.count / returnsPerPage),
    nextPage: posts.data.next,
    prevPage: posts.data.previous,
    perPage: returnsPerPage,
    posts: posts.data.results,
    isLoading: false,
    titles: await getTitles(),
  };
};

export default withRouter(Home);
