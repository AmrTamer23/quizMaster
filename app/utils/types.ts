export type UserContextType = {
    user: any;
    userPoints: number;
    updateUserPoints: (uid: string, points: number) => void;
    signUp: (email: string, password: string) => void;
    signInWithPassword: (email: string, password: string) => void;
    googleSignIn: () => void;
    logOut: () => void;
  };
  