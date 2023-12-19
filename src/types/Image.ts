export interface Image {
  id: string;
  /**
   * Download URL of the image from the storage bucket
   */
  src: string;
  /**
   * Human readable source of the image (e.g. "Unsplash")
   */
  source: string;
  description?: string;
}

export interface FirestoreImage {
  src: string;
  source: string;
  description?: string;
}
