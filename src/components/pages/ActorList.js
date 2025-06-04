import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import profil_basic from '../../assets/profil_basic.png';


const ActorList = ({ actors }) => {
  return (
    <div className="scroll-container bg-dark py-4" style={{ paddingBottom: '5rem' }}>
      <ScrollMenu className="custom-scroll" LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {actors.map((actor) => (
          <ActorCard
            key={actor.people.id}
            id={actor.people.id.toString()}
            name={actor.people.name}
            profilePath={actor.people.profile_path}
            character={actor.character}
          />
        ))}
      </ScrollMenu>
    </div>
  );
};

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  return (
    <button
      className="arrow-button left-arrow"
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  return (
    <button
      className="arrow-button right-arrow"
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};


const ActorCard = ({ id, name, profilePath, character }) => {
  return (
    <div
      id={id}
      className="actor-card text-light"
      style={{
        width: 160,
        minWidth: 160,
        height: 280,
        margin: '0 10px',
        textAlign: 'center',
        backgroundColor: '#1c1c1c',
        borderRadius: '12px',
        padding: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <img
        src={ profilePath
            ? `https://image.tmdb.org/t/p/w185${profilePath}`
            : profil_basic

        }
        alt={name}
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '0.5rem',
        }}
      />
      <div
        className="actor-name"
        style={{
          fontSize: '0.9rem',
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {name}
      </div>
      <div
        className="actor-character"
        style={{
          fontSize: '0.8rem',
          color: '#bbbbbb',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
        title={character} // tooltip si tronqué
      >
        {character || '—'}
      </div>
    </div>
  );
};

export default ActorList;
