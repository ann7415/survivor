export interface User {
  id: number;
  email: string;
  role: 'Visitor'|'Startup'|'Admin';
  startupId?: number;
  startupName?: string;
  createdDate: string;
}

export interface UserUpdate {
  email: string;
  role: string;
  startupId?: number;
}

export interface UserRoleUpdate {
  role: string;
}

export interface UserStartupAssignment {
  startupId?: number;
}
