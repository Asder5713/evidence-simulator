import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GameEndDialogProps {
  open: boolean;
}

export function GameEndDialog({ open }: GameEndDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            סיום המשמרת
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">
            המשמרת הסתיימה בשעה 05:43.
            <br />
            <br />
            תודה שהשתתפתם במשחק החקירה!
            <br />
            <br />
            <span className="text-muted-foreground text-sm">
              ניתן לרענן את הדף כדי להתחיל שוב
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}