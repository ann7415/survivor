export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
}

export interface EventCreate {
  title: string;
  description: string;
  date: Date;
  location: string;
  type: string;
}

export interface EventUpdate extends EventCreate {}

