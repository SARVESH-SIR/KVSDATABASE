
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFileContext } from "@/contexts/FileContext.jsx"; // Updated import

const FileUploadModal = ({ isOpen, onClose }) => {
  const { addFile } = useFileContext();
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [teraboxLink, setTeraboxLink] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / 1024).toFixed(2)} KB`);
      setFileType(file.name.split('.').pop() || 'unknown');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fileName || !fileSize || !fileType || !teraboxLink) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const newFile = {
      id: Date.now().toString(),
      name: fileName,
      size: fileSize,
      type: fileType,
      lastModified: new Date().toISOString(),
      teraboxLink,
    };
    
    addFile(newFile);
    
    toast({
      title: "File Uploaded",
      description: "Your file has been successfully added to the database",
    });
    
    // Reset form
    setFileName("");
    setFileSize("");
    setFileType("");
    setTeraboxLink("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="glass w-full max-w-md rounded-xl border border-primary/20 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Upload File</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              <div 
                className={`mb-4 flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
                  dragActive ? "border-primary bg-primary/10" : "border-primary/20"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mb-2 h-8 w-8 text-primary" />
                <p className="text-center text-sm">
                  Drag and drop your file here, or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  (This is a demo - no actual file upload occurs)
                </p>
              </div>

              <div className="mb-4 grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full rounded-md border border-primary/20 bg-background p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="example.pdf"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      File Size
                    </label>
                    <input
                      type="text"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      className="w-full rounded-md border border-primary/20 bg-background p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="1.2 MB"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      File Type
                    </label>
                    <input
                      type="text"
                      value={fileType}
                      onChange={(e) => setFileType(e.target.value)}
                      className="w-full rounded-md border border-primary/20 bg-background p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="pdf"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    TeraBox Link
                  </label>
                  <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-primary/20 bg-secondary/30 px-3">
                      <Link className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      value={teraboxLink}
                      onChange={(e) => setTeraboxLink(e.target.value)}
                      className="w-full rounded-r-md border border-primary/20 bg-background p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="https://terabox.com/s/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary/20"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/80 glow">
                  <File className="mr-2 h-4 w-4" /> Add File
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FileUploadModal;
  