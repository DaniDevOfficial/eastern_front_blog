export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  readat: string;
  link: string;
}

export interface FirestoreTimelineItem {
  description: string;
  date: string;
  title: string;
  readat: string;
  link: string;
}
