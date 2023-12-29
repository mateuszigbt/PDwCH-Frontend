import { Images } from './images';
import { Question } from './question';
import { CorrectAnswer } from './correctAnswer';
import { Answer } from "./answer";
import { Category } from "./category";

export interface Quiz {
  id: number,
  title: string,
  description: string,
  rating: number,
  category: Category,
  answers: Answer[],
  correctAnswer: CorrectAnswer[],
  question: Question[],
  images: Images[]
}
