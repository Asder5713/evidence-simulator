import { Link, useLocation } from "react-router-dom";
import { Search, FileText, Clock, BarChart3, Mail, MessageSquare, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameTime } from "@/hooks/use-game-time";

const taskbarItems = [
  {
    id: "overview",
    label: "סקירה כללית",
    icon: BarChart3,
    path: "/overview",
  },
  {
    id: "investigation",
    label: "מעבדת ראיות",
    icon: Search,
    path: "/lab",
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
    id: "visual-evidence",
    label: "ראיות ויזואליות",
    icon: Camera,
    path: "/visual-evidence",
  },
  {
    id: "reports",
    label: "דוחות",
    icon: FileText,
    path: "/reports",
  },
];

export function Taskbar() {
  const location = useLocation();
  const { formatGameTime, isGameStarted } = useGameTime();

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
          <div className="font-mono text-lg">{formatGameTime()}</div>
          <div className="text-xs text-muted-foreground">
            {isGameStarted ? "במשמרת" : "לא במשמרת"}
          </div>
        </div>
      </div>
    </div>
  );
}