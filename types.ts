export interface User {
  name: string;
  email: string;
  id: string;
  registrationDate: string;
}

export interface Transaction {
  date: string;
  time: string;
  type: string;
  description: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface ReferredUser {
  name: string;
  joinDate: string;
  miningStatus: 'Active' | 'Inactive';
  earned: string;
}
