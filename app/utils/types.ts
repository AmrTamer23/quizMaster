export type UserContextType = {
    user: any;
    userPoints: number;
    updateUserPoints: (uid: string, points: number) => void;
    signUp: (email: string, password: string, userName: string) => Promise<string>;
    signInWithPassword: (email: string, password: string) => void;
    googleSignIn: () => void;
    logOut: () => void;
  };
  