export interface News {
  imageUrl: string;
  id: number;
  title: string;
  content: string;
  publishDate: string;
  category: string;
  isPublished: boolean;
}

export interface NewsCreate {
  title: string;
  content: string;
  category: string;
  publishDate?: Date;
  isPublished: boolean;
  imageUrl?: string;
}

export interface NewsUpdate extends NewsCreate {}
