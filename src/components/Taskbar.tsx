import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, FileText, Clock, BarChart3, Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const taskbarItems = [
  {
    id: "overview",
    label: "סקירה כללית",
    icon: BarChart3,
    path: "/overview",
  },
  {
    id: "investigation",
    label: "חקירה פלילית",
    icon: Search,
    path: "/",
  },
  {
    id: "emails",
    label: "אימיילים",
    icon: Mail,
    path: "/emails",
  },
  {
    id: "text-messages",
    label: "הודעות טקסט",
    icon: MessageSquare,
    path: "/text-messages",
  },
  {
    id: "reports",
    label: "דוחות",
    icon: FileText,
    path: "/reports",
  },
];

export function Taskbar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("he-IL");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-background/95 backdrop-blur-sm border-t border-border flex items-center justify-between px-4 z-50">
      {/* Application Icons */}
      <div className="flex items-center gap-2">
        {taskbarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center justify-center w-10 h-8 rounded-sm transition-colors hover:bg-muted/50",
                isActive && "bg-muted border border-border shadow-sm"
              )}
              title={item.label}
            >
              <Icon className="h-4 w-4" />
            </Link>
          );
        })}
      </div>

      {/* Clock */}
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        <div className="text-right">
          <div className="font-mono">{formatTime(currentTime)}</div>
          <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
}