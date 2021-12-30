import { Region } from "./region";

export class Clientes {
    id!: number;
    nombre!: string;
    apellido!: string;
    email!: string;
    createAt!: Date;
    foto!: string;
    region!: Region;
}

