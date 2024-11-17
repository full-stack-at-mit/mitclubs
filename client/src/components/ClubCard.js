const React = require('react');
const { useState } = React;

function ClubCard({ clubName, clubCategory, website }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return React.createElement(
    'div',
    {
      style: {
        fontFamily: 'Inter',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          width: '300px',
          height: '220px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '10px',
          paddingRight: '20px',
          backgroundColor: '#f9e0e0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          textAlign: 'right',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            width: '70px',
            height: '70px',
            backgroundColor: '#b61e1e',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            fontWeight: 'bold',
            position: 'absolute',
            top: '10px',
            left: '10px',
          },
        },
        'Icon'
      ),
      React.createElement(
        'h3',
        { style: { margin: '0', fontSize: '24px', fontWeight: 'bold' } },
        clubName || 'Club Name'
      ),
      React.createElement(
        'p',
        { style: { margin: '5px 0', color: '#555', fontSize: '16px' } },
        clubCategory || 'Club Category'
      ),
      React.createElement(
        'a',
        {
          href: website || '#',
          style: {
            color: '#007bff',
            textDecoration: 'none',
            fontSize: '16px',
          },
        },
        website || 'Website'
      ),
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          },
        },
        React.createElement(
          'a',
          {
            href: `mailto:organization@example.com`,
            style: {
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '16px',
              marginBottom: '5px',
              display: 'block',
            },
            className: 'email-link',
          },
          'Email Organization'
        )
      ),
      React.createElement('button', {
        onClick: toggleBookmark,
        style: {
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '20px',
          height: '30px',
          border: '2px solid black',
          backgroundColor: isBookmarked ? 'black' : 'transparent',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        },
      })
    )
  );
}

module.exports = ClubCard;
