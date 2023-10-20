export type userDetailsType = {
    name: string;
    userName?: string;
    points: number;
    
};

export type UserContextType = {
    user: any;
    userDetails: userDetailsType;
    updateUserPoints: (uid: string, points: number) => void;
    getUserDetails: (uid: string) => void;
    signUp: (email: string, password: string, userName: string) => Promise<string>;
    signInWithPassword: (email: string, password: string) => void;
    googleSignIn: () => void;
    logOut: () => void;
  };

  export type QuizCategorieType = {
    
      category: "cs" | "geo" | "history" | "sports";
    
  }
  