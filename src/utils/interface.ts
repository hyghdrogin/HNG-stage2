export interface TaskOneInterface {
  slackUsername?: string;
  backend: boolean;
  age?: number;
  bio?: string;
}

export enum operation {
  addition = "addition",
  subtraction = "subtraction",
  multiplication = "multiplication",
}

export interface RequestInterface {
  operation_type: operation;
  x: number,
  y: number
}

export interface TaskTwoInterface {
  slackUsername: string
  operation_type: operation;
  result?: number
}
