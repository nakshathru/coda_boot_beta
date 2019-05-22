export interface ServerResponse {
    hasError: boolean;
    message: string;
    payload?: any;
    statusCode: number;
    graph?: any;
    pagination?: any;
    token: string;
    role: string;
    username: string;
    user: string;
  }
  