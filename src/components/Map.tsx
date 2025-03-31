
import React, { useEffect, useRef, useState } from 'react';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  
  const loadGoogleMapsScript = (callback: () => void) => {
    const existingScript = document.getElementById('googleMapsScript');
    
    if (!existingScript && apiKey) {
      const script = document.createElement('script');
      script.id = 'googleMapsScript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.defer = true;
      script.async = true;
      
      // Define the callback function globally
      window.initMap = callback;
      
      document.head.appendChild(script);
    } else if (existingScript && window.google && window.google.maps) {
      callback();
    }
  };
  
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    
    // Example coordinates (San Francisco)
    const officeLocation = { lat: 37.7749, lng: -122.4194 };
    
    const mapOptions = {
      center: officeLocation,
      zoom: 15,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ weight: "2.00" }]
        },
        {
          featureType: "all",
          elementType: "geometry.stroke",
          stylers: [{ color: "#9c9c9c" }]
        },
        {
          featureType: "all",
          elementType: "labels.text",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "administrative",
          elementType: "all",
          stylers: [{ saturation: "-100" }]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "simplified" }]
        }
      ]
    };
    
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    
    // Add marker for office location
    const marker = new window.google.maps.Marker({
      position: officeLocation,
      map: map,
      title: "Relatewise Headquarters",
      animation: window.google.maps.Animation.DROP
    });
    
    // Add info window for the marker
    const infoContent = `
      <div style="padding: 10px; max-width: 200px;">
        <h3 style="margin: 0 0 8px; font-weight: bold; color: #6251E1;">Relatewise HQ</h3>
        <p style="margin: 0; font-size: 14px;">123 Relationship Avenue<br>San Francisco, CA 94103</p>
      </div>
    `;
    
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoContent
    });
    
    // Open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
    
    setMapLoaded(true);
  };
  
  useEffect(() => {
    if (apiKey) {
      loadGoogleMapsScript(initializeMap);
    }
  }, [apiKey]);
  
  return (
    <div className="relative h-full w-full">
      {!apiKey ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-8">
          <p className="text-gray-600 mb-4 text-center">
            Please enter your Google Maps API Key to display the map.
          </p>
          <input
            type="text"
            placeholder="Enter Google Maps API Key"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md mb-4"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-gray-500 text-center max-w-md">
            This is for demo purposes only. In a production environment, API keys should be stored securely.
          </p>
        </div>
      ) : !mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-relationship-main"></div>
        </div>
      )}
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ display: apiKey ? 'block' : 'none' }}
      ></div>
    </div>
  );
};

export default Map;
