import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WMO_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Icy fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  61: { label: 'Light rain', icon: '🌧️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Showers', icon: '🌧️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  99: { label: 'Thunderstorm', icon: '⛈️' },
};

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [searching, setSearching] = useState(false);

  const fetchWeatherByCoords = async (lat, lon, cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=5`
      );
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      setWeather(data);
      setLocation(cityName);
    } catch {
      setError('Could not load weather data.');
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (city) => {
    setSearching(true);
    setError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      const data = await res.json();
      if (!data.results?.length) {
        setError('City not found. Try another name.');
        setSearching(false);
        return;
      }
      const r = data.results[0];
      await fetchWeatherByCoords(r.latitude, r.longitude, `${r.name}, ${r.country}`);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || 'Your location';
            const country = data.address?.country_code?.toUpperCase() || '';
            await fetchWeatherByCoords(latitude, longitude, `${city}, ${country}`);
          } catch {
            await fetchWeatherByCoords(latitude, longitude, 'Your location');
          }
        },
        () => {
          fetchWeatherByCoords(23.8315, 92.3688, 'Assam, IN');
        }
      );
    } else {
      fetchWeatherByCoords(23.8315, 92.3688, 'Assam, IN');
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityInput.trim()) searchCity(cityInput.trim());
  };

  const current = weather?.current;
  const daily = weather?.daily;
  const wmo = WMO_CODES[current?.weather_code] || { label: 'Unknown', icon: '🌡️' };
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="weather-section section" aria-label="Live weather">
      <div className="container">
        <div className="weather-header">
          <div>
            <p className="section__label">Live Weather</p>
            <h2 className="section__title" style={{ marginBottom: 0 }}>
              Current Conditions
            </h2>
            {location && <p className="weather-location">📍 {location}</p>}
          </div>
          <form onSubmit={handleSearch} className="weather-search" role="search">
            <input
              type="text"
              placeholder="Search city…"
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              aria-label="Search city"
              className="weather-search__input"
            />
            <button
              type="submit"
              className="btn btn--primary weather-search__btn"
              disabled={searching || !cityInput.trim()}
            >
              {searching ? '…' : 'Search'}
            </button>
          </form>
        </div>

        {loading && (
          <div className="weather-loading" role="status" aria-live="polite">
            <div className="weather-loading__spinner" aria-hidden="true" />
            Loading weather…
          </div>
        )}

        {error && !loading && (
          <p className="weather-error" role="alert">{error}</p>
        )}

        {weather && !loading && (
          <div className="weather-grid">
            <div className="weather-main card">
              <div className="weather-main__icon" aria-hidden="true">{wmo.icon}</div>
              <div className="weather-main__temp">
                {Math.round(current?.temperature_2m ?? 0)}°C
              </div>
              <div className="weather-main__desc">{wmo.label}</div>
              <div className="weather-main__stats">
                <div className="weather-stat">
                  <span className="weather-stat__icon" aria-hidden="true">💧</span>
                  <span className="weather-stat__label">Humidity</span>
                  <span className="weather-stat__value">{current?.relative_humidity_2m}%</span>
                </div>
                <div className="weather-stat">
                  <span className="weather-stat__icon" aria-hidden="true">💨</span>
                  <span className="weather-stat__label">Wind</span>
                  <span className="weather-stat__value">{Math.round(current?.wind_speed_10m ?? 0)} km/h</span>
                </div>
              </div>
            </div>

            <div className="weather-forecast card">
              <h3 className="weather-forecast__title">5-Day Forecast</h3>
              <div className="weather-forecast__days">
                {daily?.time?.slice(0, 5).map((dateStr, i) => {
                  const d = new Date(dateStr);
                  const dayWmo = WMO_CODES[daily.weather_code[i]] || { icon: '🌡️' };
                  return (
                    <div className="forecast-day" key={dateStr}>
                      <span className="forecast-day__name">
                        {i === 0 ? 'Today' : days[d.getDay()]}
                      </span>
                      <span className="forecast-day__icon" aria-hidden="true">{dayWmo.icon}</span>
                      <span className="forecast-day__max">{Math.round(daily.temperature_2m_max[i])}°</span>
                      <span className="forecast-day__min">{Math.round(daily.temperature_2m_min[i])}°</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WeatherWidget;