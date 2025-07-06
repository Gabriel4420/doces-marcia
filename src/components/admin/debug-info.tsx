"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testFile, setTestFile] = useState<File | null>(null);

  useEffect(() => {
    async function checkSupabaseStorage() {
      try {
        const supabase = createClient();

        // Verificar configuração básica
        const config = {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
        };

        // Verificar buckets disponíveis
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

        // Verificar permissões do bucket 'images'
        let imagesBucketInfo = null;
        if (buckets?.some(b => b.name === 'images')) {
          try {
            const { data: files, error: listError } = await supabase.storage
              .from('images')
              .list('', { limit: 5 });

            imagesBucketInfo = {
              exists: true,
              filesCount: files?.length || 0,
              listError: listError?.message || null
            };
          } catch (error) {
            imagesBucketInfo = {
              exists: true,
              error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
          }
        } else {
          imagesBucketInfo = { exists: false };
        }

        setDebugInfo({
          config,
          buckets: buckets?.map(b => ({ name: b.name, id: b.id })) || [],
          bucketsError: bucketsError?.message,
          imagesBucket: imagesBucketInfo,
          timestamp: new Date().toISOString()
        });

      } catch (error) {
        setDebugInfo({
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          timestamp: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    }

    checkSupabaseStorage();
  }, []);

  const handleTestUpload = async () => {
    if (!testFile) return;

    try {
      const supabase = createClient();

      // Gerar nome único para o arquivo de teste
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = testFile.name.split('.').pop() || 'jpg';
      const fileName = `test-${timestamp}-${randomString}.${fileExtension}`;


      // Tentar upload
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, testFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Erro no teste de upload:', error);
        setDebugInfo((prev: any) => ({
          ...prev,
          testUpload: { error: error.message, timestamp: new Date().toISOString() }
        }));
      } else {


        // Tentar obter URL pública
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        setDebugInfo((prev: any) => ({
          ...prev,
          testUpload: {
            success: true,
            fileName,
            publicUrl: urlData.publicUrl,
            timestamp: new Date().toISOString()
          }
        }));
      }

    } catch (error) {
      console.error('❌ Erro no teste de upload:', error);
      setDebugInfo((prev: any) => ({
        ...prev,
        testUpload: {
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          timestamp: new Date().toISOString()
        }
      }));
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-bold mb-2">🔧 Debug - Supabase Storage</h3>
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (!debugInfo) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <h3 className="font-bold mb-2">🔧 Debug - Supabase Storage</h3>
        <p>Erro ao carregar informações de debug</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 border border-gray-400 rounded text-sm">
      <h3 className="font-bold mb-2">🔧 Debug - Supabase Storage</h3>

      {/* Teste de Upload */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-semibold mb-2">🧪 Teste de Upload</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setTestFile(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <button
          onClick={handleTestUpload}
          disabled={!testFile}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Testar Upload
        </button>
      </div>

      {/* Informações de Debug */}
      <div className="space-y-2">
        <div>
          <strong>Configuração:</strong>
          <pre className="text-xs bg-white p-2 rounded mt-1">
            {JSON.stringify(debugInfo.config, null, 2)}
          </pre>
        </div>

        <div>
          <strong>Buckets Disponíveis:</strong>
          <pre className="text-xs bg-white p-2 rounded mt-1">
            {JSON.stringify(debugInfo.buckets, null, 2)}
          </pre>
        </div>

        <div>
          <strong>Bucket 'images':</strong>
          <pre className="text-xs bg-white p-2 rounded mt-1">
            {JSON.stringify(debugInfo.imagesBucket, null, 2)}
          </pre>
        </div>

        {debugInfo.testUpload && (
          <div>
            <strong>Teste de Upload:</strong>
            <pre className="text-xs bg-white p-2 rounded mt-1">
              {JSON.stringify(debugInfo.testUpload, null, 2)}
            </pre>
          </div>
        )}

        {debugInfo.error && (
          <div className="text-red-600">
            <strong>Erro:</strong> {debugInfo.error}
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 mt-2">
        Última atualização: {debugInfo.timestamp}
      </div>
    </div>
  );
} 