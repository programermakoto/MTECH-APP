import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/utils/supabaseServer";
import { Database } from "@/lib/database.types";

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons;
};

export default async function Home() {
  const supabase = supabaseServer();
  const lessons = await getAllLessons(supabase);

  return (
    <main className="w-full max-w-7xl mx-auto my-16 ">
      <div className="w-full flex flex-wrap gap-2">
  {lessons?.map((Lesson) => (
    <Link
      href={`/${Lesson.id}`}
      key={Lesson.id}
      className="w-full sm:w-1/3"
      style={{ flex: '1 0 100%', maxWidth: '100%' }} // スマホサイズでカードが画面全体の幅を使用
    >
      <Card className="w-full bg-gray-200" style={{ minHeight: '30vh' }}>
        <CardHeader>
          <CardTitle>{Lesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{Lesson.description}</p>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>

    </main>
  );
}
