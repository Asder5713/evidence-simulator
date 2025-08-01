import { Link, useLocation } from "react-router-dom";
import { Search, FileText, Clock, BarChart3, Mail, MessageSquare, Camera, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameContext } from "@/contexts/GameContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  }
];

export function Taskbar() {
  const location = useLocation();
  const { formatGameTime, formatGameDate, isGameStarted, unseenCounts, resetGame } = useGameContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-t border-border flex items-center justify-between px-4 z-50">
      {/* Reset Game Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={resetGame}
        className="gap-2 text-muted-foreground hover:text-foreground"
        title="אפס משחק"
      >
        <RotateCcw className="h-4 w-4" />
        אפס
      </Button>

      {/* Application Icons */}
      <div className="flex items-center gap-2">
        {taskbarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          // Get new evidence count for this app
          let newCount = 0;
          if (item.id === "emails") newCount = unseenCounts.emails;
          else if (item.id === "text-messages") newCount = unseenCounts.texts;
          else if (item.id === "visual-evidence") newCount = unseenCounts.visual;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "relative flex items-center justify-center w-10 h-8 rounded-sm transition-colors hover:bg-muted/50",
                isActive && "bg-muted border border-border shadow-sm"
              )}
              title={item.label}
            >
              <Icon className="h-4 w-4" />
              {newCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                >
                  {newCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Clock */}
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        <div className="text-right">
          <div className="font-mono text-lg">{formatGameTime()}</div>
          <div className="text-xs text-muted-foreground">{formatGameDate()}</div>
          <div className="text-xs text-muted-foreground">
            {isGameStarted ? "במשמרת" : "לא במשמרת"}
          </div>
        </div>
      </div>
    </div>
  );
}