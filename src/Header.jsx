import React from 'react';
import "./css/header.css"


const Header = (props) => {
  return (
    <header>
      <div className="logoNtitle">
        <img style={{ maxWidth: 25, maxHeight: 25 }} src='https://mediaconnect.appypie.com/media/icons/128x128/1530516045226_aircall_logo.png' alt="aircall" />
        <h1 style={{ fontFamily: 'Cabin', fontSize: 18, fontWeight: '700', marginLeft:8 }}>
          {props.heading}
        </h1>
      </div>
    </header>
  );
};

export default Header;
