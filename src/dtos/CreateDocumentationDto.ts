import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "../../src/tables/webapp.entity";

export class CreateDocumentationDto {
  @IsNotEmpty()
  @IsString()
  nameDocument!: string;

  @IsNotEmpty()
  @IsString()
  file!: string;

  @IsNotEmpty()
  @IsString()
  descricao!: string;

  @IsEnum(Status)
  status!: Status;

  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsString()
  responsavel!: string;
  
}
