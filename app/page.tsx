
import {SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/utils/supabaseServer";
import { Database } from "@/lib/database.types";



const getAllLessons = async (supabase:SupabaseClient<Database>) => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons
}



export default async function Home() {
  const supabase = supabaseServer();
const lessons = await getAllLessons(supabase);

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      <div className="flex flex-col gap-4">
        {lessons?.map((Lesson) => (
          <Link href={`/${Lesson.id}`} key={Lesson.id}>
            <Card>
              <CardHeader>
                <CardTitle>{Lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{Lesson.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))
        }
      </div>
    </main>

  );
}

