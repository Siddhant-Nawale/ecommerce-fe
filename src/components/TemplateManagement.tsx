import React, { useState, useEffect, useCallback } from "react";
import TemplateRenderer from "./TemplateRenderer";
import TemplateEditor from "./TemplateEditor";
import apiService from "../services/apiService";

type TemplateItem = {
  id: string;
  name: string;
  type: string;
  version: number;
  state: string;
  active: boolean;
  template: Array<{ type: string; [key: string]: any }>;
  createdAt: string;
  updatedAt: string;
};

const TemplateManagement: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [template, setTemplate] = useState<TemplateItem | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      const result = await apiService.getAllTemplates();
      setTemplates(result?.data || []);
      if (result?.data?.length) {
        setSelectedType(result.data[0].type);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const filteredTemplates = templates.filter(
    (template) => template.type === selectedType
  );

  const updateTemplate = (
    updatedTemplate: Array<{ type: string; [key: string]: any }>
  ) => {
    setTemplate((prevTemplate) =>
      prevTemplate
        ? { ...prevTemplate, template: updatedTemplate }
        : prevTemplate
    );
  };

  const handleSaveTemplate = async () => {
    if (template) {
      try {
        const updatedTemplate = await apiService.updateTemplate(
          template,
          template.id
        );
        setTemplate(updatedTemplate.data);
        setIsInEditMode(false);
        fetchTemplates();
      } catch (error) {
        console.error("Error saving template:", error);
      }
    }
  };

  const activateTemplate = useCallback(
    async (template: TemplateItem) => {
      try {
        const updatedTemplate = await apiService.activateTemplate(
          template.id,
          template.type
        );
        if (updatedTemplate) {
          fetchTemplates();
        }
      } catch (error) {
        console.error("Error saving template:", error);
      }
    },
    [fetchTemplates]
  );

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="header-actions flex-row flex-space-between">
          {isInEditMode ? (
            <>
              <button onClick={() => setIsInEditMode(false)}>
                Back to Table
              </button>
              <button onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? "Preview" : "Edit"}
              </button>
              <button onClick={handleSaveTemplate}>Save</button>
            </>
          ) : (
            <>
              <select
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {Array.from(
                  new Set(templates.map((template) => template.type))
                ).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      {isInEditMode ? (
        <div className="edit-mode">
          {template ? (
            isEditing ? (
              <TemplateEditor
                template={template?.template}
                onUpdate={updateTemplate}
              />
            ) : (
              <TemplateRenderer template={template?.template} />
            )
          ) : (
            <div className="no-data">Select a template to edit</div>
          )}
        </div>
      ) : (
        <div className="table-container">
          <table className="template-management-table">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Template Type</th>
                <th>State</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.length ? (
                filteredTemplates.map((template) => (
                  <tr key={template.id}>
                    <td>{template.name}</td>
                    <td>{template.type}</td>
                    <td>{template.state}</td>
                    <td>{template.active === true ? "Active" : ""}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => {
                          setTemplate(template);
                          setIsInEditMode(true);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => activateTemplate(template)}>
                        Activate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No Templates Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TemplateManagement;
