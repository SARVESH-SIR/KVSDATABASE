
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, Folder } from 'lucide-react';

const FileManagerHeader = ({ onUploadClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground glow-text">File Manager</h1>
        <p className="text-muted-foreground">Manage your TeraBox files</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          className="bg-primary hover:bg-primary/80 glow"
          onClick={onUploadClick}
        >
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
        <Button variant="outline" className="border-primary/20">
          <Folder className="mr-2 h-4 w-4" /> New Folder
        </Button>
      </div>
    </motion.div>
  );
};

export default FileManagerHeader;
  