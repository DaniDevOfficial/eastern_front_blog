import { Image } from "./Image";

export interface Post {
  id: string;
  article_id: string;
  image?: Image; // image is optional
  title: string;
  subtitle: string;
  published_at?: Date; // can be unpublished
}

/**
 * Post data as stored in firestore
 */
export interface FirestorePost {
  date: any;
  article_id: string;
  image_id?: string;
  title: string;
  subtitle: string;
  published_at?: string;
}
