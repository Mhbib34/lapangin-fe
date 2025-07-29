export type User = {
  id: string;
  email: string;
  name: string;
  isAccountVerified: boolean;
  role: string;
  username: string;
  phone: string;
  createdAt: Date;
};

export type UserPage = {
  data: User[];
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
};
