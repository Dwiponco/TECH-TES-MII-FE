import { geojson } from '@/constants/gejson';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
    googleMapsScriptLoaded: boolean;
  }
}

const MasterDataDetail = () => {
  const { id } = useParams<{ id: string }>(); // Mengambil id dari parameter URL
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google || !window.google.maps) {
        if (!window.googleMapsScriptLoaded) {
          window.googleMapsScriptLoaded = true;
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP_AP}`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            initMap();
          };
          document.head.appendChild(script);
        }
      } else {
        initMap();
      }
    };

    const initMap = (): void => {
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 7,
          center: { lat: -5.86985679999998, lng: 105.75125630000008 }, // Initial coordinates
          mapTypeId: "terrain",
        }
      );
      setMap(map);
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup code
    };
  }, []);

  const addPolylinesToMap = (feature: any) => {
    if (!map) return;

    // Validasi dan konversi koordinat
    const createPolyline = (coordinates: number[][]) => {
      const polylinePath = coordinates.map((coordinate: number[]) => {
        if (Array.isArray(coordinate) && coordinate.length === 2) {
          return { lat: coordinate[1], lng: coordinate[0] };
        } else {
          console.error("Invalid coordinate:", coordinate);
          return null;
        }
      }).filter(coordinate => coordinate !== null);

      if (polylinePath.length > 0) {
        // Buat polyline dari semua koordinat fitur
        const polyline = new window.google.maps.Polyline({
          path: polylinePath,
          geodesic: true,
          strokeColor: getRandomColor(),
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });

        // Hitung pusat koordinat polyline
        const bounds = new window.google.maps.LatLngBounds();
        polyline.getPath().forEach(function (latLng: any) {
          bounds.extend(latLng);
        });
        console.log("bounds : ",bounds)
        // Set peta ke pusat koordinat polyline
        map.fitBounds(bounds);

        // Tambahkan marker pada titik awal dan akhir polyline
        [polylinePath[0], polylinePath[polylinePath.length - 1]].forEach((coordinate, index) => {
          if (coordinate) {
            const marker = new window.google.maps.Marker({
              position: coordinate,
              map: map,
              title: index === 0 ? "Start Point" : "End Point",
            });

            const contentString = `
              <div>
                <h2>No: ${feature.properties.no}</h2>
                <p>Ruas Jalan Tol: ${feature.properties.ruas}</p>
                <p>Panjang (km): ${feature.properties.pnjng_km}</p>
                <p>Cluster: ${feature.properties.region}</p>
              </div>
            `;

            const infoWindow = new window.google.maps.InfoWindow({
              content: contentString,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          }
        });
      } else {
        console.error("No valid coordinates found for feature:", feature);
      }
    };

    if (feature.geometry.type === "LineString") {
      createPolyline(feature.geometry.coordinates);
    } else if (feature.geometry.type === "MultiLineString") {
      feature.geometry.coordinates.forEach((lineString: number[][]) => {
        createPolyline(lineString);
      });
    } else {
      console.error("Unsupported geometry type:", feature.geometry.type);
    }
  };

  // Fungsi untuk mendapatkan warna acak
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  useEffect(() => {
    // Ambil data dari API dan tambahkan polylines ke peta
    const fetchData = async () => {
      if (id) {
        // Menggunakan data dari constants untuk demonstrasi
        const feature = geojson.features.find(f => f.id === parseInt(id, 10));

        if (feature) {
          addPolylinesToMap(feature);
        } else {
          console.error("Feature not found with id:", id);
        }
      } else {
        console.error("Invalid id:", id);
      }
    };

    fetchData();
  }, [map, id]);

  return (
    <div id="map" tabIndex={0} style={{ height: '100vh', width: '100%' }} />
  );
};

export { MasterDataDetail };