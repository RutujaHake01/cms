import { cn } from "@/lib/utils";
import { Check, Clock, AlertCircle } from "lucide-react";
import { ApplicationStatus } from "@/data/constants";

const statusFlow: ApplicationStatus[] = [
  "Draft",
  "Booklet Submitted",
  "Payment Done",
  "Certificate Generated",
  "Document Uploaded",
  "Under Scrutiny by Clerk",
  "Verified by Clerk",
  "Under Review by Admin",
  "Recommended by Admin",
  "Under Review by HOD",
  "Certificate Issued",
];

interface StatusTimelineProps {
  currentStatus: ApplicationStatus;
}

const StatusTimeline = ({ currentStatus }: StatusTimelineProps) => {
  const currentIndex = statusFlow.indexOf(currentStatus);
  const isRejected = currentStatus === "Query/Rejected";

  return (
    <div className="space-y-1">
      {statusFlow.map((status, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        return (
          <div key={status} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 transition-all",
                  done && "bg-success/20 text-success",
                  current && !isRejected && "bg-primary/20 text-primary glow-primary",
                  !done && !current && "bg-muted/50 text-muted-foreground"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : current ? <Clock className="h-4 w-4" /> : i + 1}
              </div>
              {i < statusFlow.length - 1 && (
                <div className={cn("w-0.5 h-6", done ? "bg-success/40" : "bg-border/40")} />
              )}
            </div>
            <p className={cn(
              "text-sm pt-1.5",
              done && "text-success",
              current && "text-primary font-semibold",
              !done && !current && "text-muted-foreground"
            )}>
              {status}
            </p>
          </div>
        );
      })}
      {isRejected && (
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-destructive/20 text-destructive shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
          <p className="text-sm text-destructive font-semibold">Query / Rejected</p>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;
