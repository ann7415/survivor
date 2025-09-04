export interface Startup {
  id: number;
  name: string;
  description: string;
  sector: string;
  location: string;
  website: string;
  contactEmail: string;
  status: string;
  createdDate: string;
}

export interface StartupCreate {
  name: string;
  description: string;
  sector: string;
  location: string;
  website: string;
  contactEmail: string;
}

export interface StartupUpdate extends StartupCreate {
  status?: string;
}
