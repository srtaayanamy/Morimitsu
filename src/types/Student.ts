import type { Class } from "./Class";

//Interface de aluno
export type Student = {
    id?: string;
    personal: StudentPersonal;
    form?: StudentForm;
    present?: boolean;
}

export type StudentPersonal ={
    name?: string;
    nickName?: string;
    email?:string;
    birthDate?: string;
    age?: number;
    contact?: string;
    gender?: string;
    CPF?: string;
    parent?: string;
    parentContact?: string;
}

export type StudentForm ={
    rank?: string;
    rating?: number;
    frequencie?: number;
    RequiredFrequencie?: number;
    enrollment?: string; 
    comments?: string;
    classes?: string[] | Class[];
    userID?: string;
}

export type StudentParams ={
    minAge?: number,
    maxAge?: number,
    CPF?: string,
    email?: string,
    Rank?: string,
    classid?: string,
    Presence?: number
}

