
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const StorageChart = ({ fileTypes }) => {
  const canvasRef = useRef(null);
  
  // Convert fileTypes object to array for visualization
  const fileTypeData = Object.entries(fileTypes || {}).map(([type, count], index) => ({
    type,
    count,
    color: getColorForType(type, index),
  }));
  
  // Get total count
  const totalCount = fileTypeData.reduce((sum, item) => sum + item.count, 0) || 1;
  
  useEffect(() => {
    if (!canvasRef.current || fileTypeData.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pie chart
    let startAngle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    fileTypeData.forEach(item => {
      const sliceAngle = (item.count / totalCount) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowColor = item.color;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      startAngle += sliceAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
    ctx.fill();
    
    // Add text in center
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${totalCount} Files`, centerX, centerY);
    
  }, [fileTypeData, totalCount]);
  
  function getColorForType(type, index) {
    const colors = [
      "rgba(59, 130, 246, 0.8)",  // blue
      "rgba(16, 185, 129, 0.8)",  // green
      "rgba(249, 115, 22, 0.8)",  // orange
      "rgba(139, 92, 246, 0.8)",  // purple
      "rgba(236, 72, 153, 0.8)",  // pink
      "rgba(234, 179, 8, 0.8)",   // yellow
      "rgba(239, 68, 68, 0.8)",   // red
      "rgba(20, 184, 166, 0.8)"   // teal
    ];
    
    // Map specific file types to specific colors
    switch(type.toLowerCase()) {
      case "pdf": return "rgba(239, 68, 68, 0.8)";
      case "jpg":
      case "jpeg":
      case "png": return "rgba(16, 185, 129, 0.8)";
      case "doc":
      case "docx": return "rgba(59, 130, 246, 0.8)";
      case "zip":
      case "rar": return "rgba(249, 115, 22, 0.8)";
      case "mp4":
      case "mov": return "rgba(139, 92, 246, 0.8)";
      case "json": return "rgba(234, 179, 8, 0.8)";
      case "sql": return "rgba(20, 184, 166, 0.8)";
      default: return colors[index % colors.length];
    }
  }
  
  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
      
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-3 p-2">
        {fileTypeData.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center rounded-full bg-secondary/50 px-3 py-1"
          >
            <div
              className="mr-2 h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs font-medium">
              {item.type.toUpperCase()} ({item.count})
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StorageChart;
