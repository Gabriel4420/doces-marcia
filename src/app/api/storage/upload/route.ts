import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "images";

    if (!file) {
      return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
    }

    // Validações servidor
    if (!file.type || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Arquivo deve ser uma imagem" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Arquivo deve ter no máximo 5MB" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Nome único
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const fileExtension = (file.name?.split(".").pop() || "jpg").toLowerCase();
    const fileName = `${timestamp}-${randomString}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: false, contentType: file.type });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl, path: fileName });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}