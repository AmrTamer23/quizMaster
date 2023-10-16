export type UserContextType = {
    user: any;
    userDetails: any;
    updateUserPoints: (uid: string, points: number) => void;
    getUserDetails: (uid: string) => void;
    signUp: (email: string, password: string, userName: string) => Promise<string>;
    signInWithPassword: (email: string, password: string) => void;
    googleSignIn: () => void;
    logOut: () => void;
  };
  