export type User = {
  data: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    accessToken: string;
    role: string;
  };
  statusCode: number;
  success: boolean;
  message: string;
};
