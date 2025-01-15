export const mockValidateEmail = async (email: string): Promise<{ valid: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email.includes('@')) {
        resolve({ valid: true });
      } else {
        resolve({ valid: false });
      }
    }, 100);
  });
};
