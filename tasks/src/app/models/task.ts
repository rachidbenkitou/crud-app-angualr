export interface Task {
    //? mean that our id is optional, if we give a value it's ok else it's ok also.
    id?: number;
    label: string;
    completed: boolean
}
