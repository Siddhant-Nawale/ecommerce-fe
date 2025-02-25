interface SingleImageProps {
  url: string; // URL for the image
  alt?: string; // Optional alt text for the image
}

export const SingleImage: React.FC<SingleImageProps> = ({
  url,
  alt = "Image",
}) => {
  return (
    <div className="single-image-container">
      <img src={url} alt={alt} className="single-image" />
    </div>
  );
};
