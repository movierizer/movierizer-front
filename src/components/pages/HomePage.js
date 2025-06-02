import movies from  "../../data/movies.json"
import './HomePage.css';


const HomePage = () => {

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];


    const formatDate = (dateStr) => {
        if (!dateStr) return 'Date inconnue';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
        year: 'numeric',
        });
    };

    return (
        <div className="container mt-5" style={{ Width: '1296px' }}>
            <div className=" backdrop-wrapper position-relative d-inline-block">
                <img
                src={randomMovie.backdrop_path}
                alt={randomMovie.original_title}
                className="backdrop-image"
                />
                <div className="backdrop-horizontal-fade" />
                <div className="backdrop-top-fade" />
                <div className="backdrop-bottom-fade" />

                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '30px',
                        right: '30px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '20px', 
                        color: 'white',
                        zIndex: 2}}>

                    <img
                    src={randomMovie.poster_path} 
                    alt="poster"
                    style={{
                        position: 'absolute',
                        bottom: '30px',  
                        left: '30px',
                        width: '200px',  
                        height: 'auto',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                        borderRadius: '8px',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                        flexShrink: 0
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    <div
                        style={{
                        padding: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',                
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '15px',
                        marginLeft: '250px',
                        maxWidth: '800px',
                        flexGrow: 1}}
                    >
                        <h1 style={{ marginBottom: '0px' }}>{randomMovie.original_title}</h1>
                        <p style={{ marginBottom: '5px' }}>
                            <strong> {randomMovie.director_name} </strong> 
                        </p>
                        <p style={{ marginBottom: '5px' }}>
                            <strong>{formatDate(randomMovie.release_date)} </strong> 
                        </p>

                        <p style={{ marginTop: '10px' }}>
                        {randomMovie.overview.length > 200
                            ? randomMovie.overview.slice(0, 200) + '...'
                            : randomMovie.overview}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;