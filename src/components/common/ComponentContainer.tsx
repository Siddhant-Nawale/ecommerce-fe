import React, { useState } from "react";
import TemplateEditor from "../TemplateEditor";
import TemplateRenderer from "../TemplateRenderer";

interface TemplateItem {
  type: string;
  [key: string]: any;
}

interface ComponentContainerProps {
  orientation: "row" | "column";
  content: TemplateItem[];
  onUpdate: (
    changedOrientation: "row" | "column",
    updatedContent: TemplateItem[]
  ) => void;
  editMode: boolean;
}

export const ComponentContainer: React.FC<ComponentContainerProps> = ({
  orientation = "column",
  content,
  onUpdate,
  editMode = false,
}) => {
  const [changedOrientation, setChangedOrientation] = useState<
    "row" | "column"
  >(orientation);

  const handleContentUpdate = (index: number, updatedItem: TemplateItem) => {
    const updatedContent = [...content];
    updatedContent[index] = updatedItem;
    onUpdate(changedOrientation, updatedContent);
  };

  const toggleOrientation = () => {
    const newOrientation = changedOrientation === "column" ? "row" : "column";
    setChangedOrientation(newOrientation);
    onUpdate(newOrientation, content);
  };

  return (
    <div className={`component-container ${editMode ? "edit-mode" : ""}`}>
      <div>
        {editMode ? (
          <>
            <div className="flex-row flex-align-center">
              Column Layout
              <input
                type="checkbox"
                className="slider"
                checked={changedOrientation === "row"}
                onChange={toggleOrientation}
              />
              Row Layout
            </div>
            <div
              className={`${
                changedOrientation === "row" ? "flex-row" : "flex-col"
              } flex-center component-wrapper`}
            >
              {content.map((item, index) => (
                <TemplateEditor
                  key={index}
                  template={item}
                  onUpdate={(updatedItem) =>
                    handleContentUpdate(index, updatedItem)
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <div
            className={`${
              changedOrientation === "row" ? "flex-row" : "flex-col"
            } flex-center component-wrapper`}
          >
            {content.map((item, index) => (
              <TemplateRenderer key={index} template={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentContainer;
