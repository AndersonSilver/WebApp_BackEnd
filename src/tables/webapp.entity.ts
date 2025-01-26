import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 as uuidv4 } from "uuid";

export enum Status {
  ATIVO = "ativo",
  INATIVO = "inativo",
}

@Entity()
export class WebApp {
  @PrimaryKey({ type: "uuid" })
  id: string = uuidv4();

  @Property({ type: "text" })
  nameDocument!: string;

  @Property({ type: "text" })
  responsavel!: string;

  @Property({ type: "text" })
  file!: string;

  @Property({ type: "text" })
  descricao!: string;

  @Property({ type: "text"}) // Configura como enum no banco de dados
  status?: Status;

  @Property({ type: "text" })
  titulo!: string;

  @Property({ type: "datetime", onCreate: () => new Date() }) // Define automaticamente ao criar
  createdAt: Date = new Date();

  @Property({ type: "datetime", onCreate: () => new Date(), onUpdate: () => new Date() }) // Define no criar e no atualizar
  updatedAt: Date = new Date();
}
