
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, HardDrive, Upload, Users, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileContext } from "@/contexts/FileContext.jsx"; // Updated import
import StorageChart from "@/components/StorageChart";

const Dashboard = () => {
  const { files } = useFileContext();
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    fileTypes: {},
    recentActivity: []
  });

  useEffect(() => {
    // Calculate dashboard statistics
    const totalFiles = files.length;
    let totalSize = 0;
    const fileTypes = {};
    
    files.forEach(file => {
      // Extract size in MB or KB
      const sizeStr = file.size || "0 KB"; // Default size if undefined
      const sizeParts = sizeStr.split(" ");
      const sizeNum = parseFloat(sizeParts[0]) || 0;
      const sizeUnit = sizeParts[1] || "KB";
      
      // Convert to KB for calculation
      const sizeInKB = sizeUnit === "MB" ? sizeNum * 1024 : sizeNum;
      totalSize += sizeInKB;
      
      // Count file types
      const extension = file.name ? file.name.split('.').pop().toLowerCase() : 'unknown';
      fileTypes[extension] = (fileTypes[extension] || 0) + 1;
    });
    
    // Generate recent activity (for demo purposes)
    const recentActivity = [
      { action: "Upload", file: "System Backup.zip", user: "Admin", time: "2 hours ago" },
      { action: "Download", file: "User Data.json", user: "John", time: "5 hours ago" },
      { action: "Delete", file: "Old Records.csv", user: "Sarah", time: "Yesterday" },
      { action: "Modify", file: "Configuration.xml", user: "Admin", time: "2 days ago" },
    ];
    
    setStats({
      totalFiles,
      totalSize: (totalSize / 1024).toFixed(2), // Convert to MB
      fileTypes,
      recentActivity
    });
  }, [files]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground glow-text">Dashboard</h1>
          <p className="text-muted-foreground">KVS Database system overview</p>
        </div>
        <Button className="bg-primary hover:bg-primary/80 glow">
          <Upload className="mr-2 h-4 w-4" /> Upload Files
        </Button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div
          variants={itemVariants}
          className="glass rounded-xl p-6 border border-primary/20"
        >
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Files</p>
              <h3 className="text-2xl font-bold">{stats.totalFiles}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-xl p-6 border border-primary/20"
        >
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <HardDrive className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <h3 className="text-2xl font-bold">{stats.totalSize} MB</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-xl p-6 border border-primary/20"
        >
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">File Types</p>
              <h3 className="text-2xl font-bold">{Object.keys(stats.fileTypes).length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-xl p-6 border border-primary/20"
        >
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          variants={itemVariants}
          className="glass col-span-1 rounded-xl p-6 border border-primary/20 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Storage Analytics</h3>
            <Button variant="outline" size="sm" className="border-primary/20 text-primary">
              <BarChart3 className="mr-2 h-4 w-4" /> View Details
            </Button>
          </div>
          <div className="h-64">
            <StorageChart fileTypes={stats.fileTypes} />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass col-span-1 rounded-xl p-6 border border-primary/20"
        >
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center border-b border-primary/10 pb-3 last:border-0"
              >
                <div className={`mr-3 rounded-full p-2 ${
                  activity.action === "Upload" ? "bg-green-500/10 text-green-500" :
                  activity.action === "Download" ? "bg-blue-500/10 text-blue-500" :
                  activity.action === "Delete" ? "bg-red-500/10 text-red-500" :
                  "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {activity.action === "Upload" ? <Upload className="h-4 w-4" /> :
                   activity.action === "Download" ? <HardDrive className="h-4 w-4" /> :
                   activity.action === "Delete" ? <FileText className="h-4 w-4" /> :
                   <Database className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.file}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
  