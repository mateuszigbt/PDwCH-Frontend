export interface Quiz {
  id: number,
  title: string,
  description: string,
  questions: string[],
  answer: boolean[],
  images: string[]
}
