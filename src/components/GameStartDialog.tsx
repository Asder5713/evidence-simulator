import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GameStartDialogProps {
  open: boolean;
  onStartGame: () => void;
}

export function GameStartDialog({ open, onStartGame }: GameStartDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            ברוכים הבאים למשחק החקירה
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">
            אתם עומדים להתחיל משמרת לילה במחלקת החקירות הפליליות.
            <br />
            המשמרת מתחילה בשעה 02:00 ומסתיימת בשעה 05:43.
            <br />
            <br />
            עליכם לחקור תיק פלילי חדש באמצעות הראיות הזמינות:
            <br />
            אימיילים, הודעות טקסט, ראיות ויזואליות ועוד.
            <br />
            <br />
            <span className="font-semibold text-primary">
              זמן המשחק: 12 דקות
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button onClick={onStartGame} className="w-full">
            התחל משמרת
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}