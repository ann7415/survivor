export interface News {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  startup_id: number;
  publishDate: Date;
  isPublished: boolean;
  imageUrls: string[];
}

export interface NewsCreate {
  title: string;
  description: string;
  location: string;
  category: string;
  startup_id: number;
  publishDate?: Date;
  isPublished: boolean;
  imageUrl: string;
}

export interface NewsUpdate extends NewsCreate {}
