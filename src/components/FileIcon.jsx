
import React from 'react';
import { File, FileText, FileImage, FileArchive, FileCode } from 'lucide-react';

const FileIcon = ({ fileType, className = "h-10 w-10" }) => {
  switch(fileType?.toLowerCase()) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return <FileText className={`${className} text-blue-400`} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className={`${className} text-green-400`} />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FileArchive className={`${className} text-yellow-400`} />;
    case 'js':
    case 'jsx':
    case 'html':
    case 'css':
    case 'json':
    case 'sql':
      return <FileCode className={`${className} text-purple-400`} />;
    default:
      return <File className={`${className} text-gray-400`} />;
  }
};

export default FileIcon;
  