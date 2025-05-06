
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import FileIcon from '@/components/FileIcon';

const FileGridItem = ({ file, isSelected, onFileClick, onDownload, onDelete }) => {
  return (
    <motion.div
      key={file.id}
      layoutId={`file-${file.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => onFileClick(file)}
      className={`group relative cursor-pointer rounded-lg border p-4 transition-all hover:border-primary/50 ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-primary/20 bg-secondary/30"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <FileIcon fileType={file.type} />
        <h3 className="mt-2 text-sm font-medium line-clamp-1">{file.name}</h3>
        <p className="text-xs text-muted-foreground">{file.size}</p>
      </div>
      
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 rounded-b-lg bg-primary/90 p-2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
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
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(file.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileGridItem;
  