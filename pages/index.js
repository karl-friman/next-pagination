import React, { useState, useEffect, useRef, Fragment } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router';
import { filmLinks, getTitles } from '../shared/films';
import FilmFilter from '../components/FilmFilter';
import Spinner from '../components/Spinner';

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
  if (isLoading) content = <Spinner />;
  //<div>Loading...</div>;
  else {
    content = (
      <ul className='flex-container'>
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
            <li
              key={id}
              className={`characterListItem mar-1 bg-distinct ${spanStyle}`}
            >
              <div className={'characterName'}>{character.name}</div>
              <ul className={'characterInfo'}>
                <li>
                  <i className='fas fa-arrows-alt-v'></i>
                  <span className={'characterData'}>{character.height}</span>
                </li>
                <li>
                  <i className='fas fa-weight-hanging'></i>
                  <span className={'characterData'}>{character.mass}</span>
                </li>
                <li>
                  <i className='fas fa-eye'></i>
                  <span className={'characterData'}>{character.eye_color}</span>
                </li>
                {/* <li>
                  <i className='fas fa-venus-mars'></i>
                  <span className={'characterData'}>{character.gender}</span>
                </li> */}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <Fragment>
      <section>
        <nav className='bg-deep'>
          <div className='container'>
            <h1 className='txt-charisma'>Star Wars Character Browser</h1>
          </div>
        </nav>
      </section>
      <div className='container'>
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
          containerClassName={'pagination txt-charisma'}
          subContainerClassName={'pages pagination'}
          initialPage={props.currentPage - 1}
          pageCount={props.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </div>
    </Fragment>
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
