import { UUID } from "crypto";

export interface MenuPerfil {
  id: number;
  uuid: UUID;
  statusId: number;
  menuId: number;
  perfilId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
