import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router';
import { getTitles } from '../shared/films';
import FilmFilter from '../components/FilmFilter';
import Spinner from '../components/Spinner';
import Characters from '../components/Characters';

const debug = require('debug')('debug:pages');
const colors = require('colors');

const Home = (props) => {
  debug('Entering Index.js'.bgBlue.white);
  debug('props:', props);

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

  return (
    <Fragment>
      <section>
        <nav className='bg-deep'>
          <div className='container'>
            <h1 className='txt-charisma'>Star Wars Character Browser</h1>
          </div>
        </nav>
      </section>

      <section className='container'>
        <FilmFilter
          titles={props.titles}
          checkedState={checkedState}
          setCheckedState={setCheckedState}
        />
      </section>

      <section className='container'>
        <div className='posts'>
          {isLoading ? (
            <Spinner />
          ) : (
            <Characters props={props} checkedState={checkedState} />
          )}
        </div>
      </section>

      <section className='container'>
        <ReactPaginate
          forcePage={props.currentPage}
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
          disabledClassName={'pagination-disabled'}
        />
      </section>
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
