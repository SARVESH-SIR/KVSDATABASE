
import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Save, RefreshCw, Shield, Database, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Settings = ({ darkMode, setDarkMode }) => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
    });
  };

  const settingsSections = [
    {
      title: "Appearance",
      icon: darkMode ? Moon : Sun,
      settings: [
        {
          name: "Dark Mode",
          description: "Enable dark mode for the interface",
          control: (
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          ),
        },
        {
          name: "High Contrast",
          description: "Increase contrast for better visibility",
          control: <Switch />,
        },
        {
          name: "Animations",
          description: "Enable interface animations",
          control: <Switch defaultChecked />,
        },
      ],
    },
    {
      title: "Database",
      icon: Database,
      settings: [
        {
          name: "Auto Sync",
          description: "Automatically sync with TeraBox",
          control: <Switch defaultChecked />,
        },
        {
          name: "Compression",
          description: "Compress files before upload",
          control: <Switch />,
        },
        {
          name: "Cache Files",
          description: "Cache frequently accessed files",
          control: <Switch defaultChecked />,
        },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      settings: [
        {
          name: "Two-Factor Authentication",
          description: "Require 2FA for login",
          control: <Switch />,
        },
        {
          name: "File Encryption",
          description: "Encrypt files in storage",
          control: <Switch defaultChecked />,
        },
        {
          name: "Session Timeout",
          description: "Automatically log out after inactivity",
          control: <Switch defaultChecked />,
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        {
          name: "Email Alerts",
          description: "Receive email notifications",
          control: <Switch defaultChecked />,
        },
        {
          name: "Push Notifications",
          description: "Enable browser push notifications",
          control: <Switch />,
        },
        {
          name: "Activity Log",
          description: "Log all database activities",
          control: <Switch defaultChecked />,
        },
      ],
    },
  ];

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground glow-text">Settings</h1>
          <p className="text-muted-foreground">Configure your KVS Database preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-primary/20">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button className="bg-primary hover:bg-primary/80 glow" onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass rounded-xl border border-primary/20 p-6"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-3 rounded-full bg-primary/10 p-2">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div
                  key={setting.name}
                  className="flex items-center justify-between rounded-lg border border-primary/10 p-3 transition-colors hover:bg-primary/5"
                >
                  <div>
                    <h3 className="font-medium">{setting.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  {setting.control}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 glass rounded-xl border border-primary/20 p-6"
      >
        <div className="mb-4 flex items-center">
          <div className="mr-3 rounded-full bg-primary/10 p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Account Information</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-primary/10 p-3">
            <h3 className="text-sm text-muted-foreground">Username</h3>
            <p className="font-medium">admin</p>
          </div>
          <div className="rounded-lg border border-primary/10 p-3">
            <h3 className="text-sm text-muted-foreground">Email</h3>
            <p className="font-medium">admin@kvsdatabase.com</p>
          </div>
          <div className="rounded-lg border border-primary/10 p-3">
            <h3 className="text-sm text-muted-foreground">Role</h3>
            <p className="font-medium">Administrator</p>
          </div>
          <div className="rounded-lg border border-primary/10 p-3">
            <h3 className="text-sm text-muted-foreground">Last Login</h3>
            <p className="font-medium">Today, 10:30 AM</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" className="border-primary/20">
            Change Password
          </Button>
          <Button variant="outline" className="border-primary/20">
            Edit Profile
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
