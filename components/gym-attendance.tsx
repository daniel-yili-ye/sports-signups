"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import GymForm from "./gym-form";
import ResultsTable from "./results-table";
import { FormData } from "./gym-form";
import { Session } from "next-auth";

export interface Submission extends FormData {
  id: number;
  timestamp: string;
  status: "Confirmed" | "Waitlist";
}

export default function GymAttendance({
  session,
}: {
  session: Session | null;
}) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [formDate, setFormDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(
    null
  );
  const handleSubmit = (data: FormData) => {
    const newSubmission = {
      ...data,
      id: submissions.length + 1,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
      status:
        submissions.length < 20
          ? "Confirmed"
          : ("Waitlist" as "Confirmed" | "Waitlist"),
    };
    setSubmissions([...submissions, newSubmission]);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold mb-4">Basketball Attendance Form</h1>
        <Tabs defaultValue="form">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Attendance Form</TabsTrigger>
            <TabsTrigger value="results">
              Results Table ({submissions.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <GymForm
              session={session}
              onSubmit={handleSubmit}
              formDate={formDate}
              setFormDate={setFormDate}
              editingSubmission={editingSubmission}
              setEditingSubmission={setEditingSubmission}
            />
          </TabsContent>
          <TabsContent value="results">
            <ResultsTable submissions={submissions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
