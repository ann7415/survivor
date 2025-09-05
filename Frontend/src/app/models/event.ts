export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  dates: Date;
  type: string;
  imageUrls: string[];
}

export interface EventCreate {
  title: string;
  description: string;
  location: string;
  category: string;
  dates: Date;
  type: string;
  imageUrl?: string;
}
