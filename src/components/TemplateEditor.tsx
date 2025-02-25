import React, { useCallback, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import ProductListRenderer from "./ProductListRenderer";
import { SingleImage } from "./BasicComponents";
import apiService from "../services/apiService";
import InputWithOptions from "./common/InputWithOptions";

type TemplateItem = {
  type: string;
  [key: string]: any;
};

type Props = {
  template: TemplateItem[];
  onUpdate: (updatedTemplate: TemplateItem[]) => void;
};

const TemplateEditor: React.FC<Props> = ({ template, onUpdate }) => {
  const [productTags, setProductTags] = useState<string[]>([]);

  const fetchProductTypes = useCallback(async () => {
    const response = (await apiService.getUniqueProductTags())?.data?.tags;
    setProductTags(response);
  }, []);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  const handleChange = (
    index: number,
    key: string,
    value: string | string[] | boolean
  ) => {
    const updatedTemplate = [...template];
    updatedTemplate[index] = { ...updatedTemplate[index], [key]: value };
    onUpdate(updatedTemplate);
  };

  const handleUpdateUrls = (index: number, newUrls: string[]) => {
    const updatedTemplate = [...template];
    updatedTemplate[index] = { ...updatedTemplate[index], urls: newUrls };
    onUpdate(updatedTemplate);
  };

  const handleAddTag = (index: number, tag: string) => {
    if (!tag.trim()) return;

    const updatedTemplate = [...template];
    updatedTemplate[index].tagList = [...updatedTemplate[index].tagList, tag];
    onUpdate(updatedTemplate);
  };

  const handleDeleteTag = (index: number, tag: string) => {
    const updatedTemplate = [...template];
    updatedTemplate[index].tagList = updatedTemplate[index].tagList.filter(
      (t: string) => t !== tag
    );
    onUpdate(updatedTemplate);
  };

  const handleToggleTagsMatch = (index: number) => {
    const updatedTemplate = [...template];
    updatedTemplate[index].allTagsMatch = !updatedTemplate[index].allTagsMatch;
    onUpdate(updatedTemplate);
  };

  return (
    <div className="editor-panel">
      <div className="editor-content">
        {template.map((item, index) => (
          <div key={index} className="editor-section">
            {/* Image Slider */}
            {item.type === "imageSlider" && (
              <div className="editor-field">
                <label>Image Slider</label>
                <ImageSlider
                  urls={item.urls}
                  editMode={true}
                  onUpdate={(newUrls) => handleUpdateUrls(index, newUrls)}
                />
              </div>
            )}

            {/* Image */}
            {item.type === "image" && (
              <div className="editor-field">
                <label>Image URL</label>
                <input
                  type="text"
                  className="name-input"
                  value={item.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                />
                {item.url && <SingleImage url={item.url} alt="preview" />}
              </div>
            )}

            {/* Product List */}
            {item.type === "productList" && (
              <div className="editor-field">
                <label>List Name</label>
                <input
                  type="text"
                  className="name-input"
                  value={item.listName}
                  onChange={(e) =>
                    handleChange(index, "listName", e.target.value)
                  }
                />

                <ProductListRenderer
                  tagList={item.tagList}
                  allTagsMatch={item.allTagsMatch}
                />

                {/* Toggle for allTagsMatch */}
                <div className="tags-match-toggle">
                  <p>Match All Tags</p>
                  <input
                    type="checkbox"
                    checked={item.allTagsMatch}
                    onChange={() => handleToggleTagsMatch(index)}
                  />
                </div>

                {/* Tags Section */}
                <div className="tags-container">
                  <div className="tags-list">
                    {item.tagList?.map((tag: string, tagIndex: number) => (
                      <div key={tagIndex} className="tag-block">
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="delete-tag-btn"
                          onClick={() => handleDeleteTag(index, tag)}
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Tag Input Component */}
                  <InputWithOptions
                    existingTags={item.tagList}
                    availableTags={productTags}
                    handleOnSelectEmmitor={(tag) => handleAddTag(index, tag)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateEditor;
