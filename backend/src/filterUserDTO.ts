import { Status } from "../generated/prisma/enums";

export class filterUserDTO {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    status?: Status;
    page?: number;
    limit?: number;
}