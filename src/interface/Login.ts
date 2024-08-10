export interface Credentials{
    email: string;
    password: string;
}

export type Token = {
    data: { token: string };
    error: boolean;
    message: string;
    result: number;
}
