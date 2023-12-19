import {
  articleCollection,
  postCollection,
  imagesCollection,
  timelineCollection,
  adminCollection,
  imageStorage,
} from "../configs/firebase";
import { Article } from "../types/Article";
import { Post, FirestorePost } from "../types/Post";
import { FirestoreImage, Image } from "../types/Image";
import { getDoc, getDocs, doc, addDoc } from "firebase/firestore";
import { FirestoreTimelineItem, TimelineItem } from "../types/Timeline";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    console.log(timelineCollection);
    const snapshot = await getDocs(timelineCollection);
    const timelineItemPromises: Promise<TimelineItem>[] = snapshot.docs.map(
      async (doc) => {
        const data = doc.data() as FirestoreTimelineItem;

        return {
          id: data.id,
          date: data.date,
          title: data.title,
          description: data.description || "",
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

async function uploadImageToStorage(image: File): Promise<string> {
  try {
    // Create a storage reference
    const storageRef = ref(imageStorage, image.name);

    // Upload the image to Firebase
    const snapshot = await uploadBytes(storageRef, image);

    // Get the download URL of the uploaded image
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (e) {
    throw new Error("Could not upload image:\n" + e);
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

export async function isAdmin(uid: string): Promise<boolean> {
  try {
    const snapshot = await getDoc(doc(adminCollection, uid));

    if (!snapshot.exists()) {
      return false;
    }

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Uploads an image to firestore and returns the id of the image
 * @param image the image to upload
 * @returns the id of the uploaded image
 */
async function createImage(image: FirestoreImage): Promise<string> {
  try {
    const docRef = await addDoc(imagesCollection, image);

    return docRef.id;
  } catch (e) {
    throw new Error("Could not create image:\n" + e);
  }
}

async function createArticle(article: string): Promise<string> {
  try {
    const docRef = await addDoc(articleCollection, { text: article });

    return docRef.id;
  } catch (e) {
    throw new Error("Could not create article:\n" + e);
  }
}

interface CreatePostInput {
  title: string;
  subTitle: string;
  article: string;
  image: CreatePostImageInput;
}

interface CreatePostImageInput {
  file: File;
  source: string;
  description: string;
}

/**
 * Uploads a post to firestore and returns the id of the created post
 * @param input the post to upload
 * @returns the id of the created post
 */
export async function createPost(input: CreatePostInput): Promise<string> {
  let post: Partial<FirestorePost> = {
    title: input.title,
    subtitle: input.subTitle,
    published_at: new Date().toLocaleDateString(),
  };
  if (input.image) {
    try {
      const image: FirestoreImage = {
        src: await uploadImageToStorage(input.image.file),
        source: input.image.source,
        description: input.image.description,
      };

      post.image_id = await createImage(image);
    } catch (e) {
      throw new Error("Could not upload image:\n" + e);
    }
  }
  try {
    const article_id = await createArticle(input.article);

    post.article_id = article_id;
  } catch (e) {
    throw new Error("Could not upload article:\n" + e);
  }

  try {
    const docRef = await addDoc(postCollection, post);

    return docRef.id;
  } catch (e) {
    throw new Error("Could not create post:\n" + e);
  }
}
