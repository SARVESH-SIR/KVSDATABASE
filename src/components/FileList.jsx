
import React from 'react';
import FileListItem from '@/components/FileListItem';

const FileList = ({ files, selectedFile, onFileClick, onDownload, onDelete }) => {
  return (
    <div className="divide-y divide-primary/10">
      {files.map((file) => (
        <FileListItem 
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

export default FileList;
  