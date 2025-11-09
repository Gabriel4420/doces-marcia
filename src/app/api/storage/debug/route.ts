import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const srk = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !srk) {
      return NextResponse.json({
        ok: false,
        error: "Env ausente",
        NEXT_PUBLIC_SUPABASE_URL: !!url,
        SUPABASE_SERVICE_ROLE_KEY: !!srk,
      }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Tenta listar buckets (deve funcionar com Service Role)
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Extrai o ref da chave (parte do payload do JWT)
    const refMatch = srk.match(/"ref":"([a-z0-9]+)"/);
    const inferredRef = refMatch?.[1] || null;

    return NextResponse.json({
      ok: true,
      url,
      inferredRef,
      buckets: buckets?.map(b => ({ name: b.name, id: b.id })) || [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}