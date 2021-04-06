import { http } from '../http';

export interface QuizData {
  quizId: number;
  title: string;
  description: string;
  userName: string;
  created: Date;
  questions: QuestionData[];
}

export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  answersId: number[];
}

export interface AnswerData {
  answerId: number;
  answerChar: string;
  content: string;
}

// const answers: AnswerData[] = [
//   {
//     answerId: 0,
//     answerChar: 'A',
//   },
// // ];

// const questions: QuestionData[] = [{}, {}, {}];
