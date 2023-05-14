import { compare, hash } from 'bcrypt';

export const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const encryptedPassword = await hash(password, SALT_ROUNDS);
  return encryptedPassword;
};

export const comparePassword = async (
  password: string,
  encryptedPassword: string,
): Promise<boolean> => {
  const isPasswordMatching = await compare(password, encryptedPassword);
  return isPasswordMatching;
};
