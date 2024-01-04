import { Points } from './points';
export interface QuizProfile {
  id?: number,
  title?: string,
  category?: string,
  rating?: number
  points?: Points
}
