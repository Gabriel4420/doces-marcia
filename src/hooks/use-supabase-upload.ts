import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { UseSupabaseUploadReturn, UploadResult } from "@/types/supabase";



export function useSupabaseUpload(): UseSupabaseUploadReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadImage = useCallback(async (
    file: File,
    bucketName: string = "images"
  ): Promise<UploadResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();



      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        throw new Error('Arquivo deve ser uma imagem');
      }

      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Arquivo deve ter no máximo 5MB');
      }

      const skipBucketCheck = true;
      // Verificar se o bucket existe
      if (!skipBucketCheck) {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      if (bucketsError) {
        console.error('Erro ao listar buckets:', bucketsError);
        throw new Error(`Erro ao verificar buckets: ${bucketsError.message}`);
      }

      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);



      if (!bucketExists) {
        console.warn(`Bucket '${bucketName}' não encontrado. Buckets disponíveis:`, buckets?.map(b => b.name));
        // Tentar com bucket padrão se o especificado não existir
        const defaultBucket = buckets?.[0]?.name || 'images';

        bucketName = defaultBucket;
      }
      }

      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop() || 'jpg';
      const fileName = `${timestamp}-${randomString}.${fileExtension}`;



      // Upload via API do servidor (Service Role)
      const fd = new FormData();
      fd.append('file', file);
      fd.append('bucket', bucketName);

      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const problem = await res.json().catch(() => ({ error: 'Falha desconhecida no upload' }));
        throw new Error(`Erro no upload: ${problem.error}`);
      }

      const payload = await res.json();

      return {
        url: payload.url,
        path: payload.path
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido no upload';
      console.error('Erro no upload da imagem:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadMultipleImages = useCallback(async (
    files: File[],
    bucketName: string = "images"
  ): Promise<UploadResult[]> => {
    setLoading(true);
    setError(null);

    try {
      const uploadPromises = files.map(file => uploadImage(file, bucketName));
      const results = await Promise.all(uploadPromises);

      // Filtrar resultados nulos (erros)
      const successfulUploads = results.filter((result): result is UploadResult => result !== null);

      if (successfulUploads.length !== files.length) {
        setError('Alguns arquivos não puderam ser enviados');
      }

      return successfulUploads;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido no upload múltiplo';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [uploadImage]);

  const deleteImage = useCallback(async (
    path: string,
    bucketName: string = "images"
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([path]);

      if (deleteError) {
        throw new Error(`Erro ao deletar: ${deleteError.message}`);
      }

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao deletar';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    loading,
    error,
    clearError
  };
}