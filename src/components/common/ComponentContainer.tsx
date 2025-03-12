import React, { useCallback, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { templateComponentOptions } from "../../configs/templateComponentOptions";
import TemplateEditor from "../TemplateEditor";
import TemplateRenderer from "../TemplateRenderer";
import Popup from "./Popup";

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

  const [showAddComponentPicker, setShowAddComponentPicker] = useState(false);

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

  const handleAddComponent = useCallback(
    (skeletonToAdd: any) => {
      const updatedContent = [...content, skeletonToAdd];
      onUpdate(changedOrientation, updatedContent);
      setShowAddComponentPicker(false);
    },
    [changedOrientation, content, onUpdate]
  );

  const deleteComponentFromTemplate = useCallback(
    (index: number) => {
      const updatedContent = [...content];
      updatedContent.splice(index, 1);
      onUpdate(changedOrientation, updatedContent);
      setShowAddComponentPicker(false);
    },
    [changedOrientation, content, onUpdate]
  );
  return (
    <div className={`component-container ${editMode ? "edit-mode" : ""}`}>
      <div className="component-container-content">
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
              } component-wrapper`}
            >
              {content.map((item, index) => (
                <>
                  <TemplateEditor
                    key={index}
                    template={item}
                    onUpdate={(updatedItem) =>
                      handleContentUpdate(index, updatedItem)
                    }
                    deleteComponent={
                      <div className="container-option-wrapper container-delete-option-wrapper flex-row flex-center">
                        <MdDelete
                          onClick={() => deleteComponentFromTemplate(index)}
                        />
                      </div>
                    }
                  />
                </>
              ))}
              <div
                className={`container-option-wrapper container-add-option-wrapper flex-row flex-center ${changedOrientation}`}
              >
                <MdAdd onClick={() => setShowAddComponentPicker(true)} />
              </div>
            </div>

            <ComponentPickerOverlay
              isOpen={showAddComponentPicker}
              onClose={() => setShowAddComponentPicker(false)}
              componentPickedCallback={handleAddComponent}
            />
          </>
        ) : (
          <div
            className={`${
              changedOrientation === "row" ? "flex-row" : "flex-col"
            } component-wrapper`}
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

const ComponentPickerOverlay = ({
  isOpen,
  onClose,
  componentPickedCallback,
}: {
  isOpen: boolean;
  onClose: () => void;
  componentPickedCallback: (component: { name: string; code: string }) => void;
}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="popup-title">Pick a Component</h2>
      <div className="component-grid">
        {templateComponentOptions?.map((component) => (
          <div
            key={component.code}
            className="component-card"
            onClick={() => componentPickedCallback(component.skeleton)}
          >
            <h3 className="component-name">{component.name}</h3>
            <p className="component-description">{component.description}</p>
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default ComponentContainer;
