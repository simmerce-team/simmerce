import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Messages - Simmerce",
  description:
    "Connect with suppliers and buyers on Simmerce B2B marketplace",
};

export default function ChatPage() {
  return (

    redirect("/not-found")

    // <div className="flex flex-col">
    //   <Header />
    //   <ChatInterface />
    // </div>
  );
}
