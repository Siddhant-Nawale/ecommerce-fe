interface SingleImageProps {
  url: string; // URL for the image
  altText?: string; // Optional alt text for the image
}

export const SingleImage: React.FC<SingleImageProps> = ({
  url,
  altText = "Image",
}) => {
  return (
    <div className="single-image-container">
      <img src={url} alt={altText} className="single-image" />
    </div>
  );
};
