
import React from "react";
import { motion } from "framer-motion";
import { Database, Files, Settings, Home, Server, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "files", icon: Files, label: "File Manager" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="glass w-20 flex flex-col items-center py-8 border-r border-primary/20"
    >
      <div className="mb-12 flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md"></div>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
            <Database className="h-6 w-6" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-xs font-bold tracking-wider text-primary glow-text"
        >
          KVS DB
        </motion.div>
      </div>

      <TooltipProvider>
        <div className="flex flex-1 flex-col items-center space-y-6">
          {menuItems.map((item) => (
            <Tooltip key={item.id} delayDuration={300}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    activeView === item.id
                      ? "bg-primary text-white glow"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <div className="mt-auto flex flex-col items-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground"
        >
          <Server className="h-4 w-4" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground"
        >
          <Activity className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
