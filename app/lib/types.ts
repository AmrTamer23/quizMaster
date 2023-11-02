export type userDetailsType = {
    name: string;
    userName?: string;
    points: number;
    
};

export type UserContextType = {
    user: any;
    userDetails: userDetailsType;
    updatePoints: (points: number) => void;
    signUp: (email: string, password: string, userName: string) => Promise<string>;
    signInWithPassword: (email: string, password: string) => Promise<void>;
    googleSignIn: () => Promise<void>;
    logOut: () => void;
};

export type QuizCategorieType = "cs" | "geo" | "history" | "sports";

export type QuizQuestion = {
    category: string;
    type: 'multiple';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};