import { memo } from 'react';
const Footer = memo(() => {
  //console.log('footer render');
  return (
    <>
      {/* <footer className='bg-deep'>
        <div className='container'>
          <b>{process.env.NODE_ENV}</b> mode This site uses the
          <a className='' href='https://swapi.dev/'>
            {' '}
            SWAPI API
          </a>
        </div>
      </footer> */}
    </>
  );
});

Footer.displayName = 'Footer';
export default Footer;
