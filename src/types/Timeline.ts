export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  readat: string;
  link: URL;
}

  export interface FirestoreTimelineItem {
    description: string;
    date: string;
    title: string;
    readat: string;
    link: URL;
  }
  