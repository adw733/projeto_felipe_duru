export interface snackbarInterface {
  titulo: string;
  mensagem: string;
  color: string;
  timeout: number;
  callback?: string;
  isConfirm: boolean;
}
