
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Trash2, MoreVertical } from 'lucide-react';
import FileIcon from '@/components/FileIcon';

const FileListItem = ({ file, isSelected, onFileClick, onDownload, onDelete }) => {
  return (
    <motion.div
      key={file.id}
      layoutId={`file-list-${file.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onFileClick(file)}
      className={`group flex cursor-pointer items-center justify-between p-4 transition-all hover:bg-primary/5 ${
        isSelected ? "bg-primary/10" : ""
      }`}
    >
      <div className="flex items-center overflow-hidden">
        <div className="mr-4 flex-shrink-0">
          <FileIcon fileType={file.type} className="h-8 w-8" />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-medium truncate">{file.name}</h3>
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <span>{file.size}</span>
            <span>
              {new Date(file.lastModified).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 space-x-2 ml-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDownload(file);
          }}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(file.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => e.stopPropagation()} // Prevent row selection when clicking dots
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default FileListItem;
  