import React, { useCallback, useEffect, useState } from "react";
import apiService from "../services/apiService";
import ImageSlider from "./ImageSlider";
import ProductListRenderer from "./ProductListRenderer";
import { SingleImage } from "./common/BasicComponents";
import { ComponentContainer } from "./common/ComponentContainer";
import { ImageViewerWithList } from "./common/ImageViewerWithList";
import InputWithOptions from "./common/InputWithOptions";

type TemplateItem = {
  type: string;
  [key: string]: any;
};

type Props = {
  template: TemplateItem;
  onUpdate: (updatedTemplate: TemplateItem) => void;
  deleteComponent?: React.ReactNode;
};

const TemplateEditor: React.FC<Props> = ({
  template,
  onUpdate,
  deleteComponent,
}) => {
  const [productTags, setProductTags] = useState<string[]>([]);

  const fetchProductTypes = useCallback(async () => {
    const response = (await apiService.getUniqueProductTags())?.data?.tags;
    setProductTags(response);
  }, []);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  const handleChange = (key: string, value: string | string[] | boolean) => {
    onUpdate({ ...template, [key]: value });
  };

  return (
    <div className="editor-panel">
      {deleteComponent}
      <div className="editor-content">
        <div className="editor-section">
          {/* Image Slider */}
          {template.type === "imageSlider" && (
            <div className="editor-field">
              <label>Image Slider</label>
              <ImageSlider
                urls={template.urls}
                editMode={true}
                onUpdate={(newUrls) => handleChange("urls", newUrls)}
              />
            </div>
          )}

          {/* Image */}
          {template.type === "image" && (
            <div className="editor-field">
              <label>Image URL</label>
              <input
                type="text"
                className="name-input"
                value={template.url}
                onChange={(e) => handleChange("url", e.target.value)}
              />
              <div className="single-image-wrapper">
                {template.url && (
                  <SingleImage url={template.url} alt="preview" />
                )}
              </div>
            </div>
          )}

          {/* Product List */}
          {template.type === "productList" && (
            <div className="editor-field">
              <label>List Name</label>
              <input
                type="text"
                className="name-input"
                value={template.listName}
                onChange={(e) => handleChange("listName", e.target.value)}
              />

              <ProductListRenderer
                tagList={template.tagList}
                allTagsMatch={template.allTagsMatch}
              />

              {/* Toggle for allTagsMatch */}
              <div>
                <p>Match All Tags</p>
                <input
                  className="slider"
                  type="checkbox"
                  checked={template.allTagsMatch}
                  onChange={() =>
                    handleChange("allTagsMatch", !template.allTagsMatch)
                  }
                />
              </div>

              {/* Tags Section */}
              <div className="tags-container">
                <div className="tags-list">
                  {template.tagList?.map((tag: string, tagIndex: number) => (
                    <div key={tagIndex} className="tag-block">
                      <span>{tag}</span>
                      <button
                        type="button"
                        className="delete-tag-btn"
                        onClick={() =>
                          handleChange(
                            "tagList",
                            template.tagList.filter((t: string) => t !== tag)
                          )
                        }
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tag Input Component */}
                <div className="input-with-option-wrapper">
                  <InputWithOptions
                    existingTags={template.tagList}
                    availableTags={productTags}
                    handleOnSelectEmmitor={(tag) =>
                      handleChange("tagList", [...template.tagList, tag])
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {template.type === "imageViewerWithList" && (
            <div className="editor-field">
              <label>Image Viewer With List</label>
              <ImageViewerWithList
                imageUrls={template.imageUrls}
                selectedImageUrl={template.selectedImageUrl}
                editMode={true}
                onUpdate={(newUrls) => handleChange("imageUrls", newUrls)}
              />
            </div>
          )}

          {template.type === "componentContainer" && (
            <div>
              <ComponentContainer
                orientation={template.orientation}
                content={template.content}
                onUpdate={(orientation, content) =>
                  onUpdate({ ...template, orientation, content })
                }
                editMode={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
