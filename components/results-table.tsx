import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Submission {
  id: number;
  fullName: string;
  waiverSigned: boolean;
  safetyCommitment: boolean;
  timestamp: string;
  status: "Confirmed" | "Waitlist";
}

interface ResultsTableProps {
  submissions: Submission[];
}

const getRoleBadgeColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300";
  }
};

export default function ResultsTable({ submissions }: ResultsTableProps) {
  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.id}</TableCell>
            <TableCell>{submission.timestamp}</TableCell>
            <TableCell>{submission.fullName}</TableCell>
            <TableCell>
              <Badge className={getRoleBadgeColor(submission.status)}>
                {submission.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
