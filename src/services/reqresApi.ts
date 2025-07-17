const BASE_URL = 'https://reqres.in/api';

interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ReqResResponse {
  data: ReqResUser[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface ExtendedUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  organization: string;
  phone: string;
  status: string;
}

export const fetchReqResUsers = async (): Promise<ExtendedUser[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users?per_page=12`);
    const data: ReqResResponse = await response.json();
    
    // Duplicate and modify users to get 100+
    const extendedUsers: ExtendedUser[] = [];
    for (let i = 0; i < 10; i++) {
      data.data.forEach((user: ReqResUser, index: number) => {
        extendedUsers.push({
          ...user,
          id: `${user.id}-${i}`,
          email: `${user.first_name.toLowerCase()}.${user.last_name.toLowerCase()}${i}@example.com`,
          organization: ['Lendsqr', 'Irorun', 'Lendstar'][index % 3],
          phone: `080${Math.floor(Math.random() * 100000000)}`,
          status: ['Active', 'Pending', 'Blacklisted', 'Inactive'][index % 4],
        });
      });
    }
    
    return extendedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
