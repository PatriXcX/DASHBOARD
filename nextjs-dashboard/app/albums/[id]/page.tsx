"use client"; // Esto asegura que el componente se ejecute en el cliente

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Asegúrate de incluir los pesos que necesitas
});


interface ImageDetail {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
}

export default function ImageDetailPage() {
  const [image, setImage] = useState<ImageDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // Obtener el `id` de la URL dinámica

  useEffect(() => {
    if (!id) return; // No hacer la solicitud si el id no está disponible
    console.log("ID de la imagen recibido desde la URL:", id);

    const fetchImageDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=6R9Nl3CHIWMEVxo8roxUmqTypvPYqN-7h072E-3wXlY`
        );

        if (!response.ok) {
          throw new Error("Error al obtener la imagen");
        }

        const data = await response.json();
        console.log("Datos recibidos de la API:", data);
        setImage(data); // Guardar la imagen
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      } finally {
        setLoading(false); // Fin de la carga
      }
    };

    fetchImageDetail();
  }, [id]);

  // Mostrar mensajes de carga o errores
  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (!image) {
    return <p className="text-center">No se encontró la imagen.</p>;
  }

  return (
    <div className="image-detail-page">
      <h1 className="photo-title">{image.alt_description || "Sin título"}</h1>
      <img 
        src={image.urls.regular} 
        alt={image.alt_description || "Imagen"} 
        className="detail_pic" 
      />
      <p className= "image_desc">{image.description || "No description available."}</p>
    </div>
);
}
