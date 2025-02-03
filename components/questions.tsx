import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { FormData } from "./master-form";
import { UseFormReturn } from "react-hook-form";

interface QuestionsProps {
  session: Session | null;
  onSubmit: (data: FormData) => void;
  editingSubmission: boolean;
  setEditingSubmission: (submission: boolean) => void;
  showForm: boolean;
  setShowForm: (form: boolean) => void;
  form: UseFormReturn<FormData>;
}

export default function Questions({
  session,
  onSubmit,
  editingSubmission,
  setEditingSubmission,
  showForm,
  setShowForm,
  form,
}: QuestionsProps) {
  const handleSubmit = (data: FormData) => {
    onSubmit(data);
    setShowForm(false);
  };

  const handleEdit = () => {
    setShowForm(true);
    setEditingSubmission(true);
  };

  return (
    <Form {...form}>
      {showForm ? (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4 pt-4 text-sm text-gray-500">
            <div>
              <p>
                Submission of this form implies your attendance for Monday
                night. If you can no longer attend, please modify your response
                to this form. If you have a +1, please link them this form! If
                we are overcapacity (20 participant cap), waitlisted individuals
                will be notified via the website.
              </p>
            </div>
            <div>
              <p className="font-bold">What To Expect</p>
              <ul className="list-disc list-inside">
                <li>Games are casual and open to all skill levels</li>
                <li>7:00 - 7:45pm shooting/warm up</li>
                <li>7:45 - 8:00pm devotional and discussion</li>
                <li>8:00 pm 4v4 full court, 1s up to 7</li>
                <li>Last game(s) end before 10:30 pm</li>
                <li>Please remember to prioritize safety</li>
                <li>Have fun!</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Special Note</p>
              <p>
                This basketball session is part of our church ministry. It's a
                great time for us to connect not only through the game but also
                with each other and the message of the gospel. Everyone,
                regardless of your faith background, is welcome to join.
              </p>
            </div>
          </div>

          <Separator />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your full name? (First and Last)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waiverSigned"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I have signed and agreed to the{" "}
                    <Link
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdNYPEtVxNSR2XQ_tAT0UpCRr2FnuG9MAEGPkUFk1noRxSx_w/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      gym usage waiver
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="safetyCommitment"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I will commit to playing in a safe and respectful manner, to
                    avoid swearing, and refrain from inappropriate language and
                    behaviour to ensure a safe, positive and welcoming
                    environment for everyone.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">
            {editingSubmission ? "Resubmit" : "Submit"}
          </Button>
        </form>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your form has been submitted successfully.
          </AlertDescription>
          <Button
            className="text-blue-500 underline"
            variant="link"
            onClick={handleEdit}
          >
            Edit your response
          </Button>
        </Alert>
      )}
    </Form>
  );
}
