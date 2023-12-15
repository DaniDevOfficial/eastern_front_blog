export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  link: URL;
}

  export interface FirestoreTimelineItem {
    description: string;
    date: string;
    title: string;
    link: URL;
  }
  