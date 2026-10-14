function RouteMap() {
  return (
    <section className="route-map" aria-label="Route network preview">
      <div className="map-line line-one" />
      <div className="map-node terminal">Bancasi</div>
      <div className="map-node stop-a">Libertad</div>
      <div className="map-node stop-b">Langihan</div>
      <div className="map-node stop-c">Baan</div>
      <div className="map-node stop-d">CSU</div>
      <div className="map-node stop-e">Ampayon</div>
      <div className="moving-bus" aria-hidden="true" />
    </section>
  );
}

export default RouteMap;
