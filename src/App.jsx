
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import FileManager from "@/components/FileManager";
import Settings from "@/components/Settings";
import ThreeBackground from "@/components/ThreeBackground";
import { FileProvider } from "@/contexts/FileContext.jsx"; // Updated import

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved files from localStorage on initial load
    const savedFiles = localStorage.getItem("kvsFiles");
    if (!savedFiles) {
      // Initialize with sample data if no data exists
      const initialFiles = [
        {
          id: "1",
          name: "Project Documentation.pdf",
          type: "pdf",
          size: "2.4 MB",
          lastModified: new Date().toISOString(),
          teraboxLink: "https://terabox.com/s/sample1",
        },
        {
          id: "2",
          name: "Database Schema.sql",
          type: "sql",
          size: "156 KB",
          lastModified: new Date().toISOString(),
          teraboxLink: "https://terabox.com/s/sample2",
        },
        {
          id: "3",
          name: "User Data.json",
          type: "json",
          size: "89 KB",
          lastModified: new Date().toISOString(),
          teraboxLink: "https://terabox.com/s/sample3",
        },
      ];
      localStorage.setItem("kvsFiles", JSON.stringify(initialFiles));
      
      // Use try-catch to potentially avoid issues if toast isn't ready
      try {
        toast({
          title: "Welcome to KVS Database",
          description: "Sample data has been loaded for demonstration",
          duration: 5000,
        });
      } catch (error) {
        console.error("Failed to show initial toast:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed toast from dependency array to prevent re-triggering on toast instance change

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "files":
        return <FileManager />;
      case "settings":
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FileProvider>
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <ThreeBackground />
        
        <div className="relative z-10 flex h-screen">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          
          <main className="flex-1 overflow-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        
        <Toaster />
      </div>
    </FileProvider>
  );
}

export default App;
  