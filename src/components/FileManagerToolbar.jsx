
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List } from 'lucide-react';

const FileManagerToolbar = ({ searchQuery, onSearchChange, viewMode, onViewModeChange }) => {
  return (
    <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={onSearchChange}
          className="h-10 w-full rounded-md border border-primary/20 bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary glass"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="border-primary/20">
          <Filter className="h-4 w-4" />
        </Button>
        <div className="flex rounded-md border border-primary/20 overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            className={viewMode === "grid" ? "rounded-none bg-primary" : "rounded-none"}
            onClick={() => onViewModeChange("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            className={viewMode === "list" ? "rounded-none bg-primary" : "rounded-none"}
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileManagerToolbar;
  