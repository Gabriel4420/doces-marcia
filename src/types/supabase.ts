export interface UploadResult {
  url: string;
  path: string;
}

export interface UseSupabaseUploadReturn {
  uploadImage: (file: File, bucketName?: string) => Promise<UploadResult | null>;
  uploadMultipleImages: (files: File[], bucketName?: string) => Promise<UploadResult[]>;
  deleteImage: (path: string, bucketName?: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}