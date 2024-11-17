const Mapgg = (props) => {

    const { isLoaded } = props;
    const containerStyle = {
        width: '100vw',
        height: '100vh',
      }
      
      const center = {
        lat: 30.3165,
        lng: 78.0322,
      }
    
    
    return (
        isLoaded && (
            <>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                </GoogleMap>
            </>
        )
    );
}

export default Mapgg;