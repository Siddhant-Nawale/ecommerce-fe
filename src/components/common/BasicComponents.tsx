interface SingleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  alt?: string;
}

export const SingleImage: React.FC<SingleImageProps> = ({
  url,
  alt = "Image",
  ...props
}) => {
  return (
    <div className="single-image-container">
      <img src={url} alt={alt} className="single-image" {...props} />
    </div>
  );
};
