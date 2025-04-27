import { cookies } from 'next/headers';

export const getServerAuthToken = async (): Promise<string | null> => {
  return (await cookies()).get('token')?.value || null;
};
export const getServerAuthTokenUser = async (): Promise<string | null> => {
  return (await cookies()).get('user_token')?.value || null;
};