"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [images, setImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]); // Imágenes filtradas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [authorInput, setAuthorInput] = useState<string>(""); // Input de autor
  const [locationInput, setLocationInput] = useState<string>(""); // Input de localización
  const [isAuthorEditing, setIsAuthorEditing] = useState<boolean>(false); // Estado para editar autor
  const [isLocationEditing, setIsLocationEditing] = useState<boolean>(false); // Estado para editar localización

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = [...images];

    // Filtro por autor
    if (authorInput) {
      filtered = filtered.filter((image) =>
        image.user.username.toLowerCase().includes(authorInput.toLowerCase())
      );
    }

    // Filtro por localización
    if (locationInput) {
      filtered = filtered.filter((image) =>
        image.location?.name?.toLowerCase().includes(locationInput.toLowerCase())
      );
    }

    setFilteredImages(filtered); // Actualizamos las imágenes filtradas
  };

  // Cargar imágenes desde la API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://api.unsplash.com/photos/random?query=landscape&count=52&client_id=6R9Nl3CHIWMEVxo8roxUmqTypvPYqN-7h072E-3wXlY"
        );

        if (!response.ok) {
          throw new Error("Error al obtener las imágenes");
        }

        const data = await response.json();
        setImages(data);
        setFilteredImages(data); // Inicialmente se muestran todas las imágenes
      } catch (error) {
        setError("No se pudo cargar las imágenes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filtrar cuando se cambian los filtros
  useEffect(() => {
    applyFilters();
  }, [authorInput, locationInput]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="album_filter">
        {/* Botón para activar el filtro por autor */}
        <div className="filter-button-container">
          <button
            onClick={() => setIsAuthorEditing(true)} // Al hacer clic se activa el campo de texto
            className="filter-button"
          >
            {isAuthorEditing ? (
              <input
                type="text"
                placeholder="Author name"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)} // Cambia el estado al escribir
                onBlur={() => setIsAuthorEditing(false)} // Cuando el campo pierde el foco, el input se desactiva
                autoFocus
              />
            ) : (
              "Author filter"
            )}
          </button>
        </div>

        {/* Botón para activar el filtro por localización */}
        <div className="filter-button-container">
          <button
            onClick={() => setIsLocationEditing(true)} // Al hacer clic se activa el campo de texto
            className="filter-button"
          >
            {isLocationEditing ? (
              <input
                type="text"
                placeholder="Location name"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)} // Cambia el estado al escribir
                onBlur={() => setIsLocationEditing(false)} // Cuando el campo pierde el foco, el input se desactiva
                autoFocus
              />
            ) : (
              "Location filter"
            )}
          </button>
        </div>
      </div>

      <div className="albums-grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="album-card">
            <img
              src={image.urls.small}
              alt={image.alt_description || "Imagen"}
              className="h-64 object-cover rounded-md"
            />
            <Link href={`/albums/${image.id}`}>
              <button>Detail</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
