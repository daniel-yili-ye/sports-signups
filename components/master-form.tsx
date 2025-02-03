"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Questions from "./questions";
import Responses from "./responses";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  waiverSigned: z.boolean().refine((val) => val === true, {
    message: "You must agree to the gym usage waiver",
  }),
  safetyCommitment: z.boolean().refine((val) => val === true, {
    message: "You must commit to safe and respectful behavior",
  }),
});

export type FormData = z.infer<typeof formSchema>;

export interface Submission extends FormData {
  id: number;
  timestamp: string;
  status: "Confirmed" | "Waitlist";
}

export default function MasterForm({ session }: { session: Session | null }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: session?.user?.name || "",
      waiverSigned: false,
      safetyCommitment: false,
    },
  });

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
            <TabsTrigger value="form">Questions</TabsTrigger>
            <TabsTrigger value="results">
              Responses ({submissions.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Questions
              session={session}
              onSubmit={handleSubmit}
              showForm={showForm}
              setShowForm={setShowForm}
              editingSubmission={editingSubmission}
              setEditingSubmission={setEditingSubmission}
              form={form}
            />
          </TabsContent>
          <TabsContent value="results">
            <Responses submissions={submissions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
