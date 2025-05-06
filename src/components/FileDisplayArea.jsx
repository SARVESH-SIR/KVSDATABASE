
import React from 'react';
import FileGrid from '@/components/FileGrid';
import FileList from '@/components/FileList';
import { FilePlus } from 'lucide-react';

const FileDisplayArea = ({ 
  viewMode, 
  files, 
  selectedFile, 
  onFileClick, 
  onDownload, 
  onDelete 
}) => {
  if (files.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <FilePlus className="mb-4 h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-medium">No files found</h3>
        <p className="text-muted-foreground">Upload files or change your search query</p>
      </div>
    );
  }

  return viewMode === "grid" ? (
    <FileGrid 
      files={files} 
      selectedFile={selectedFile}
      onFileClick={onFileClick}
      onDownload={onDownload}
      onDelete={onDelete}
    />
  ) : (
    <FileList 
      files={files} 
      selectedFile={selectedFile}
      onFileClick={onFileClick}
      onDownload={onDownload}
      onDelete={onDelete}
    />
  );
};

export default FileDisplayArea;
  