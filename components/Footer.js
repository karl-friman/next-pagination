import { memo } from 'react';
const Footer = memo(() => {
  //console.log('footer render');
  return (
    <>
      <footer className=''>
        <div className=''>
          <b>{process.env.NODE_ENV}</b> mode © 2021 Copyright:
          <a className='' href='https://www.karlfriman.com/'>
            {' '}
            Karl Friman
          </a>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = 'Footer';
export default Footer;
