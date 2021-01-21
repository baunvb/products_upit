import React, { useEffect } from 'react'

function MapApi(props) {

  const onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(props.id),
      props.options);
    props.onMapLoad(map)
  }

  useEffect(() => {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyCQI5gMIQvq_jZUhvlKp7BV_IycefjIoYU&libraries=places&language=vi`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', e => {
        onScriptLoad()
      })
    } else {
      onScriptLoad()
    }
  }, [])


  return (
     <div style={{ width: "0px", height: "0px" }} id={props.id} />

  );
}

export default MapApi