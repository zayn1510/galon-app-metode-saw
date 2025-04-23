import { cookies } from 'next/headers';

export const getServerAuthToken = async (): Promise<string | null> => {
  return (await cookies()).get('token')?.value || null;
};