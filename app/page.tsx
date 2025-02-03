import MasterForm from "@/components/master-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) return redirect("/signin");
  return (
    <div className="m-4 mb-8">
      <MasterForm session={session} />
    </div>
  );
}
