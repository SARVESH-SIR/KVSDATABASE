
import React from 'react';
import FileGridItem from '@/components/FileGridItem';

const FileGrid = ({ files, selectedFile, onFileClick, onDownload, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {files.map((file) => (
        <FileGridItem 
          key={file.id}
          file={file} 
          isSelected={selectedFile?.id === file.id}
          onFileClick={onFileClick}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FileGrid;
  