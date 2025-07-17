const BASE_URL = 'https://randomuser.me/api/';

interface RandomUserName {
  first: string;
  last: string;
}

interface RandomUserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
}

interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface RandomUserLogin {
  uuid: string;
  username: string;
}

interface RandomUserRegistered {
  date: string;
  age: number;
}

interface RandomUserApiUser {
  name: RandomUserName;
  email: string;
  phone: string;
  gender: string;
  location: RandomUserLocation;
  picture: RandomUserPicture;
  login: RandomUserLogin;
  registered: RandomUserRegistered;
}

interface RandomUserApiResponse {
  results: RandomUserApiUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: string;
  // Additional fields for user details
  firstName: string;
  lastName: string;
  gender: string;
  picture: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  // Banking details
  bvn: string;
  accountNumber: string;
  bankName: string;
  balance: number;
  // Social media
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  // Employment
  employment: {
    level: string;
    status: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  // Personal info
  personal: {
    maritalStatus: string;
    children: string;
    residence: string;
  };
  // Guarantor
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

export const fetchUsers = async (count: number = 100): Promise<User[]> => {
  try {
    const batchSize = 100; // API limit
    const batches = Math.ceil(count / batchSize);
    const allUsers: User[] = [];
    
    for (let i = 0; i < batches; i++) {
      const currentBatchSize = Math.min(batchSize, count - (i * batchSize));
      const response = await fetch(`${BASE_URL}?results=${currentBatchSize}&seed=lendsqr${i}`);
      const data: RandomUserApiResponse = await response.json();
      
      const batchUsers = data.results.map((user: RandomUserApiUser, index: number) => {
        const globalIndex = (i * batchSize) + index;
        return {
          id: user.login.uuid,
          organization: ['Lendsqr', 'Irorun', 'Lendstar'][globalIndex % 3],
          username: user.login.username,
          email: user.email,
          phone: user.phone,
          dateJoined: new Date(user.registered.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: ['Active', 'Pending', 'Blacklisted', 'Inactive'][globalIndex % 4],
          firstName: user.name.first,
          lastName: user.name.last,
          gender: user.gender,
          picture: user.picture.large,
          address: {
            street: `${user.location.street.number} ${user.location.street.name}`,
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
          },
          bvn: Math.random().toString().slice(2, 13),
          accountNumber: Math.random().toString().slice(2, 12),
          bankName: ['Providus Bank', 'GTBank', 'Access Bank'][globalIndex % 3],
          balance: Math.floor(Math.random() * 1000000),
          social: {
            twitter: `@${user.login.username}`,
            facebook: `${user.name.first} ${user.name.last}`,
            instagram: `@${user.login.username}`
          },
          employment: {
            level: ['B.Sc', 'M.Sc', 'PhD', 'HND'][globalIndex % 4],
            status: ['Employed', 'Self-employed', 'Unemployed'][globalIndex % 3],
            sector: ['FinTech', 'Healthcare', 'Education', 'Technology'][globalIndex % 4],
            duration: `${Math.floor(Math.random() * 5) + 1} years`,
            officeEmail: user.email,
            monthlyIncome: `₦${(Math.floor(Math.random() * 500000) + 100000).toLocaleString()}.00- ₦${(Math.floor(Math.random() * 500000) + 400000).toLocaleString()}.00`,
            loanRepayment: `${Math.floor(Math.random() * 100000) + 10000}`
          },
          personal: {
            maritalStatus: ['Single', 'Married', 'Divorced'][globalIndex % 3],
            children: Math.floor(Math.random() * 4).toString() || 'None',
            residence: ["Parent's Apartment", "Own Apartment", "Rented Apartment"][globalIndex % 3]
          },
          guarantor: {
            fullName: `${data.results[(globalIndex + 1) % data.results.length]?.name.first} ${data.results[(globalIndex + 1) % data.results.length]?.name.last}`,
            phoneNumber: data.results[(globalIndex + 1) % data.results.length]?.phone || '07060780922',
            email: data.results[(globalIndex + 1) % data.results.length]?.email || 'guarantor@email.com',
            relationship: ['Sister', 'Brother', 'Friend', 'Colleague'][globalIndex % 4]
          }
        };
      });
      
      allUsers.push(...batchUsers);
    }
    
    return allUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const users = await fetchUsers(100);
    return users.find(user => user.id === userId) || null;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

// Add these new functions to handle user status updates
export const updateUserStatus = async (userId: string, newStatus: 'Active' | 'Blacklisted'): Promise<User> => {
  try {
    // Get current user data
    const user = await fetchUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update the status
    const updatedUser = { ...user, status: newStatus };
    
    // Save to localStorage for persistence
    const storageKey = `user_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedUser));
    
    // Also update the main users list in localStorage
    const usersKey = 'lendsqr_users';
    const existingUsers = localStorage.getItem(usersKey);
    if (existingUsers) {
      const usersList = JSON.parse(existingUsers);
      const userIndex = usersList.findIndex((u: User) => u.id === userId);
      if (userIndex !== -1) {
        usersList[userIndex] = updatedUser;
        localStorage.setItem(usersKey, JSON.stringify(usersList));
      }
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const blacklistUser = async (userId: string): Promise<User> => {
  return updateUserStatus(userId, 'Blacklisted');
};

export const activateUser = async (userId: string): Promise<User> => {
  return updateUserStatus(userId, 'Active');
};
