
import React, { useState, useCallback, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useFileContext } from "@/contexts/FileContext.jsx"; // Updated import
import FileUploadModal from "@/components/FileUploadModal";
import FileManagerHeader from "@/components/FileManagerHeader";
import FileManagerToolbar from "@/components/FileManagerToolbar";
import FileDisplayArea from "@/components/FileDisplayArea";

const FileManager = () => {
  const { files, deleteFile } = useFileContext();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredFiles = useMemo(() => 
    files.filter(file => 
      file.name && file.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [files, searchQuery]);

  const handleFileClick = useCallback((file) => {
    setSelectedFile(prevSelectedFile => 
      prevSelectedFile?.id === file.id ? null : file
    );
  }, []);

  const handleDeleteFile = useCallback((id) => {
    deleteFile(id);
    setSelectedFile(null); // Deselect after deletion
    toast({
      title: "File Deleted",
      description: "The file has been successfully removed",
      variant: "destructive",
    });
  }, [deleteFile, toast]);

  const handleDownload = useCallback((file) => {
    // In a real app, this would initiate download from file.teraboxLink
    // For demo, show toast and maybe log the link
    console.log("Attempting to download from:", file.teraboxLink);
    toast({
      title: "Download Initiated",
      description: `Preparing download for ${file.name}. Please check your browser downloads.`,
    });
    // If it was a direct link, you could use: window.open(file.teraboxLink, '_blank');
    // However, TeraBox links usually go to a page, not a direct file.
  }, [toast]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  const handleOpenUploadModal = useCallback(() => {
    setShowUploadModal(true);
  }, []);

  const handleCloseUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <FileManagerHeader onUploadClick={handleOpenUploadModal} />
      
      <FileManagerToolbar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      <div className="flex-1 overflow-y-auto glass rounded-xl border border-primary/20 p-6">
        <FileDisplayArea 
          viewMode={viewMode}
          files={filteredFiles}
          selectedFile={selectedFile}
          onFileClick={handleFileClick}
          onDownload={handleDownload}
          onDelete={handleDeleteFile}
        />
      </div>

      <FileUploadModal 
        isOpen={showUploadModal} 
        onClose={handleCloseUploadModal} 
      />
    </div>
  );
};

export default FileManager;
  