import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router';

const filmLinks = {
  'https://swapi.dev/api/films/1/': 1,
  'https://swapi.dev/api/films/2/': 2,
  'https://swapi.dev/api/films/3/': 3,
  'https://swapi.dev/api/films/4/': 4,
  'https://swapi.dev/api/films/5/': 5,
  'https://swapi.dev/api/films/6/': 6,
  'https://swapi.dev/api/films/7/': 7,
  'https://swapi.dev/api/films/8/': 8,
  'https://swapi.dev/api/films/9/': 9,
};

const Home = (props) => {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const pagginationHandler = (page) => {
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
          let disabledFilm = 4;
          let characterInFilms = '';
          let spanStyle = '';

          character.films.map((film) => {
            if (filmLinks[film]) {
              console.log(filmLinks[film].valueOf());
              characterInFilms += filmLinks[film].valueOf();
              if (filmLinks[film].valueOf() == disabledFilm) {
                spanStyle = 'disabledCharacter';
              }
            }
          });

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
        pageCount={props.pageCount} //page count
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={pagginationHandler}
      />
    </div>
  );
};

Home.getInitialProps = async ({ query }) => {
  // const page = query.page || 1;
  // const posts = await axios.get(
  //   `https://gorest.co.in/public-api/posts?_format=json&access-token=cxzNs8fYiyxlk708IHfveKM1z1xxYZw99fYE&page=${page}`
  // );
  // return {
  //   totalCount: posts.data.meta.total,
  //   pageCount: posts.data.meta.pages,
  //   currentPage: posts.data.meta.page,
  //   perPage: posts.data.meta.limit,
  //   posts: posts.data.data,
  //   isLoading: false,
  // };
  const returnsPerPage = 10;
  const page = query.page || 1;
  const posts = await axios.get(`https://swapi.dev/api/people?page=${page}`);

  return {
    totalCount: posts.data.count,
    pageCount: Math.ceil(posts.data.count / returnsPerPage),
    //currentPage: posts.data.meta.page,
    nextPage: posts.data.next,
    prevPage: posts.data.previous,
    perPage: returnsPerPage,
    posts: posts.data.results,
    isLoading: false,
  };
};

export default withRouter(Home);
