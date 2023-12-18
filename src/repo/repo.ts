import {
  articleCollection,
  postCollection,
  imagesCollection,
  timelineCollection,
} from "../configs/firebase";
import { Article } from "../types/Article";
import { Post, FirestorePost } from "../types/Post";
import { Image } from "../types/Image";
import { getDoc, getDocs, doc } from "firebase/firestore";
import { FirestoreTimelineItem, TimelineItem } from "../types/Timeline";

// TODO: split this file into multiple files (one per entity)

/**
 * Fetches all post from firestore
 * @returns the posts
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const snapshot = await getDocs(postCollection);

    const postPromises: Promise<Post>[] = snapshot.docs.map(async (doc) => {
      const data = doc.data() as FirestorePost;

      const published_at = data.published_at
        ? new Date(data.published_at)
        : undefined;

      let image: Image | undefined;
      try {
        image = data.image_id ? await getImageById(data.image_id) : undefined;
      } catch {
        image = undefined;
      }

      return {
        id: doc.id,
        article_id: data.article_id,
        image: image,
        title: data.title,
        subtitle: data.subtitle,
        published_at: published_at,
      } as Post;
    });

    return await Promise.all(postPromises);
  } catch (e) {
    throw new Error("Could not get posts:\n" + e);
  }
}

/**
 * Fetches all Timeline Items from firestore
 * @returns the posts
 */
export async function getAllTimelineItems(): Promise<TimelineItem[]> {
  try {
    console.log(timelineCollection)
    const snapshot = await getDocs(timelineCollection);
    const timelineItemPromises: Promise<TimelineItem>[] = snapshot.docs.map(
      async (doc) => {
        const data = doc.data() as FirestoreTimelineItem;

        return {
          id: data.id, 
          date: data.date,
          title: data.title,
          description: data.description || '', 
          link: data.link,
          readat: data.readat,
        };
      }
    );

    return await Promise.all(timelineItemPromises);
  } catch (e) {
    throw new Error("Could not get timeline items:\n" + e);
  }
}
/**
 * Fetches an image from firestore by id
 * @param id id of the image
 * @returns the image with the given id
 */
async function getImageById(id: string): Promise<Image> {
  try {
    const snapshot = await getDoc(doc(imagesCollection, id));

    if (!snapshot.exists()) {
      throw new Error("No such document!");
    }

    const data = snapshot.data() as Image;

    return {
      id: snapshot.id,
      src: data.src,
      source: data.source,
      description: data.description,
    } as Image;
  } catch (e) {
    throw new Error("Could not get image:\n" + e);
  }
}

/**
 * Fetches an article from firestore by id
 * @param id id of the article
 * @returns the article with the given id
 */
export async function getArticleById(id: string): Promise<Article> {
  try {
    const snapshot = await getDoc(doc(articleCollection, id));

    if (!snapshot.exists()) {
      throw new Error("No such document!");
    }

    const data = snapshot.data() as Article;

    return {
      id: snapshot.id,
      text: data.text,
    } as Article;
  } catch (e) {
    throw new Error("Could not get article:\n" + e);
  }
}

export async function getPostById(id: string): Promise<Post> {
  try {
    const snapshot = await getDoc(doc(postCollection, id));

    if (!snapshot.exists()) {
      throw new Error("No such document!");
    }

    const data = snapshot.data() as FirestorePost;

    const published_at = data.published_at
      ? new Date(data.published_at)
      : undefined;

    let image: Image | undefined;
    try {
      image = data.image_id ? await getImageById(data.image_id) : undefined;
    } catch {
      image = undefined;
    }

    return {
      id: snapshot.id,
      article_id: data.article_id,
      image: image,
      title: data.title,
      subtitle: data.subtitle,
      published_at: published_at,
    } as Post;
  } catch (e) {
    throw new Error("Could not get post:\n" + e);
  }
}
