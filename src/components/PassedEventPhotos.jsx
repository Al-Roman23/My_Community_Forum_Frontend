import React from "react";
import { useLocation, useNavigate } from "react-router";

const PassedEventPhotos = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const images = location.state?.images || [];
  const title = location.state?.title || "Event Photos";
  const subtitle = location.state?.subtitle || "";

  if (!images.length) {
    return (
      <div className="p-16 text-center">
        <h1>No images to display</h1>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-base-100 w-full">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-primary mt-7">{title}</h2>
        {subtitle && (
          <p className="max-w-3xl mx-auto text-gray-600 mt-3">{subtitle}</p>
        )}
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Event Photo ${idx + 1}`}
            className="rounded-lg shadow-md object-cover w-full h-64 transition-transform duration-200 hover:scale-105"
          />
        ))}
      </div>
    </section>
  );
};

export default PassedEventPhotos;
