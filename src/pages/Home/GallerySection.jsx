import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const GallerySection = ({
  title,
  subtitle,
  images,
  eventTitles,
  eventSubtitles,
}) => {
  const navigate = useNavigate();

  const eventImages = [
    images.slice(0, 9),
    images.slice(9, 18),
    images.slice(18, 27),
  ];

  return (
    <section className="py-16 bg-base-100 w-full">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        {subtitle && (
          <p className="max-w-3xl mx-auto text-gray-600 mt-3">{subtitle}</p>
        )}
      </div>

      <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-6">
        {eventImages.map((imgs, idx) => {
          const extraCount = imgs.length - 3;

          return (
            <div
              key={idx}
              className="flex-1 bg-base-200 rounded-xl shadow-md p-4 cursor-pointer relative"
              onClick={() =>
                navigate(`/passed-event-photos`, {
                  state: {
                    images: imgs,
                    title: eventTitles?.[idx] || `Event ${idx + 1}`,
                    subtitle: eventSubtitles?.[idx] || "",
                  },
                })
              }
            >
              <h3 className="text-xl font-bold mb-2 text-center">
                {eventTitles?.[idx] || `Event ${idx + 1}`}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {eventSubtitles?.[idx] || ""}
              </p>

              <div className="relative w-full h-[250px] flex justify-center items-center">
                {imgs.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Event ${idx + 1} Preview ${i + 1}`}
                    className="object-cover rounded-lg border-4 border-white shadow-lg transition-transform duration-200 hover:scale-105"
                    style={{
                      width: "70%",
                      height: "99%",
                      position: "absolute",
                      left: `${i * 90}px`,
                      top: `${i * 10}px`,
                      zIndex: 3 - i,
                    }}
                  />
                ))}

                {extraCount > 0 && (
                  <div
                    className="absolute w-72 h-[99%] bg-black bg-opacity-60 text-white flex items-center justify-center text-2xl font-bold rounded-lg"
                    style={{
                      left: `${2 * 90}px`,
                      top: `${2 * 10}px`,
                      zIndex: 0,
                    }}
                  >
                    +{extraCount} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

GallerySection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  eventTitles: PropTypes.arrayOf(PropTypes.string),
  eventSubtitles: PropTypes.arrayOf(PropTypes.string),
};

export default GallerySection;
