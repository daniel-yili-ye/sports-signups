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

interface ResponsesProps {
  submissions: Submission[];
}

export default function Responses({ submissions }: ResponsesProps) {
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
              <Badge variant={submission.status}>{submission.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
