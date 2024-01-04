import { Images } from './images';
import { Question } from './question';
import { CorrectAnswer } from './correctAnswer';
import { Answer } from "./answer";
import { Category } from "./category";

export interface Quiz {
  quizId?: number,
  title: string,
  description: string,
  rating: number,
  category: Category,
  answers: Answer[],
  correctAnswers: CorrectAnswer[],
  questions: Question[],
  images: Images[]
}
