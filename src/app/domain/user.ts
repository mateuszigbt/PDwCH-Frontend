import { QuizProfile } from './quizProfile';
export interface User{
  id?: number,
  login: string,
  password: string,
  email: string,
  isAdmin: boolean,
  quizProfile?: QuizProfile[]
}
