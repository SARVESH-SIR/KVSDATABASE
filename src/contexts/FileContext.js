
import React, { createContext, useContext, useState, useEffect } from "react";

const FileContext = createContext();

export const useFileContext = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  // Load files from localStorage on initial render
  useEffect(() => {
    const savedFiles = localStorage.getItem("kvsFiles");
    if (savedFiles) {
      try {
        setFiles(JSON.parse(savedFiles));
      } catch (error) {
        console.error("Error parsing files from localStorage:", error);
        setFiles([]);
      }
    }
  }, []);

  // Save files to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kvsFiles", JSON.stringify(files));
  }, [files]);

  // Add a new file
  const addFile = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  // Delete a file
  const deleteFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  // Update a file
  const updateFile = (id, updatedFile) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === id ? { ...file, ...updatedFile } : file))
    );
  };

  return (
    <FileContext.Provider value={{ files, addFile, deleteFile, updateFile }}>
      {children}
    </FileContext.Provider>
  );
};
