export class CreateEmailDto {
    origin: string;
    to?: string;
    subject: string;
    context: any;
}
