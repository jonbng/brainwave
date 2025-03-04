import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("messages").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }

  return (
    <div className="p-4">
      {data.map((message) => (
        <div
          key={message.id}
          className={`p-4 mb-4 rounded-lg ${
            message.isUsers ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
          }`}
        >
          <p className="text-sm text-gray-600">{message.created_at}</p>
          <p className="text-lg">{message.content}</p>
        </div>
      ))}
    </div>
  );
}