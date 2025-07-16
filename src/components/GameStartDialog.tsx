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
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-black bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
            משחק החקירה - הנשרים השחורים
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed space-y-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
              <h3 className="text-red-300 font-bold text-lg mb-2">תקציר המקרה</h3>
              <p className="text-slate-300">
                רצח דני לוי, בעל חנות תכשיטים יוקרתית ברוטשילד, 
                שסירב לשלם כספי הגנה לארגון הפשע "הנשרים השחורים".
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <h4 className="text-blue-300 font-semibold mb-1">פרטי המשמרת</h4>
                <p className="text-slate-300">שעות: 02:00 - 05:43</p>
                <p className="text-slate-300">זמן משחק: 12 דקות</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <h4 className="text-green-300 font-semibold mb-1">חשוד עיקרי</h4>
                <p className="text-slate-300">יוסי כהן (28)</p>
                <p className="text-slate-300">בן מנהיג הארגון</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-lg p-4">
              <h4 className="text-orange-300 font-bold mb-2">משימתכם</h4>
              <div className="text-slate-300 text-sm space-y-1">
                <p>• חקרו את הראיות: אימיילים, הודעות טקסט, ראיות ויזואליות</p>
                <p>• בחנו את המידע על ארגון "הנשרים השחורים"</p>
                <p>• אספו ראיות לכתיבת דוח חקירה מפורט</p>
                <p>• זהו קשרים בין החשודים והראיות</p>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
              <p className="font-semibold text-yellow-300 text-sm">
                ⚠️ שימו לב: ראיות חדשות יופיעו במהלך המשמרת בזמן אמת
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button onClick={onStartGame} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3">
            התחל חקירה 🔍
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}