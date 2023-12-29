import { Points } from './points';
import { QuizProfile } from './quizProfile';
export interface User{
  id?: number,
  login: string,
  password: string,
  email: string,
  isAdmin: boolean,
  quizProfile?: QuizProfile[],
  points?: Points[]
}
