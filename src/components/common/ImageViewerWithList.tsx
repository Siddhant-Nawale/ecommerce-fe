import { useEffect, useState } from "react";
import { SingleImage } from "./BasicComponents";

interface Props {
  imageUrls: string[];
  selectedImageUrl: string;
  editMode?: boolean;
  onUpdate?: (newUrls: string[]) => void;
}

export const ImageViewerWithList: React.FC<Props> = ({
  imageUrls = [],
  selectedImageUrl = "",
  editMode = false,
  onUpdate,
}) => {
  const [images, setImages] = useState<string[]>(imageUrls);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    Math.max(imageUrls.indexOf(selectedImageUrl), 0)
  );
  const [editImageUrl, setEditImageUrl] = useState<string>(
    imageUrls[selectedIndex] || ""
  );

  useEffect(() => {
    setImages(imageUrls);
    const newIndex = Math.max(imageUrls.indexOf(selectedImageUrl), 0);
    setSelectedIndex(newIndex);
    setEditImageUrl(imageUrls[newIndex] || "");
  }, []);

  const handleUpdateImage = () => {
    if (!editImageUrl.trim()) return;
    const updatedImages = [...images];
    updatedImages[selectedIndex] = editImageUrl;
    setImages(updatedImages);
    if (onUpdate) onUpdate(updatedImages);
  };

  const handleAddImage = () => {
    if (!editImageUrl.trim()) return;
    const updatedImages = [...images, editImageUrl];
    setImages(updatedImages);
    setSelectedIndex(updatedImages.length - 1);
    setEditImageUrl("");
    if (onUpdate) onUpdate(updatedImages);
  };

  const handleDeleteImage = () => {
    if (images.length === 0) return;
    const updatedImages = images.filter((_, i) => i !== selectedIndex);
    const newIndex = Math.max(selectedIndex - 1, 0);
    setImages(updatedImages);
    setSelectedIndex(newIndex);
    setEditImageUrl(updatedImages[newIndex] || "");
    if (onUpdate) onUpdate(updatedImages);
  };

  return (
    <div className="image-viewer">
      {/* Main Image */}
      <SingleImage url={images[selectedIndex]} className="main-image" />

      {/* Edit Mode Controls */}
      {editMode && (
        <div className="edit-controls">
          <input
            type="text"
            placeholder="Enter image URL"
            value={editImageUrl}
            className="image-url-input"
            onChange={(e) => setEditImageUrl(e.target.value)}
          />
          <button onClick={handleUpdateImage}>Update</button>
          <button onClick={handleAddImage}>Add</button>
          <button onClick={handleDeleteImage} disabled={images.length === 0}>
            Delete
          </button>
        </div>
      )}

      {/* Image List */}
      <div className="image-list">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => {
              setSelectedIndex(index);
              setEditImageUrl(images[index]);
            }}
          >
            <SingleImage url={imageUrl} className="thumbnail-img" />
          </div>
        ))}
      </div>
    </div>
  );
};
