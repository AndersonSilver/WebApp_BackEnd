import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDocumentationDto } from "../../dtos/CreateDocumentationDto";
import { CreateDocumentationService } from "../../services/APIs/created-documentation-service";
import { MikroORM } from "@mikro-orm/core";

export class CreateDocumentationController {
  constructor(private readonly orm: MikroORM) {
    if (!this.orm || !this.orm.em) {
      throw new Error("MikroORM não foi inicializado corretamente.");
    }
  }

  async handlePost(req: Request, res: Response) {
    try {
      console.log("ORM:", this.orm);
      console.log("Entity Manager:", this.orm?.em);

      const dto = plainToInstance(CreateDocumentationDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        });
      }

      const { nameDocument, file, descricao, status, titulo, responsavel } = dto;
      const entityManager = this.orm.em.fork();
      const createDocumentationService = new CreateDocumentationService(entityManager);

      const result = await createDocumentationService.execute({
        nameDocument,
        file,
        descricao,
        status,
        titulo,
        responsavel,
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Erro no handle:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async handleGet(req: Request, res: Response) {
    try {
      const entityManager = this.orm.em.fork();
      const createDocumentationService = new CreateDocumentationService(entityManager);

      // Use o serviço para buscar os registros
      const documents = await createDocumentationService.findAll();

      return res.status(200).json({ message: "Documentos encontrados", data: documents });
    } catch (error) {
      console.error("Erro no handleGet:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async handleFilter(req: Request, res: Response) {
    try {
      const { nameDocument } = req.query;
  
      if (!nameDocument || typeof nameDocument !== "string") {
        return res.status(400).json({ message: "Parâmetro 'nameDocument' é obrigatório e deve ser uma string." });
      }
  
      const entityManager = this.orm.em.fork();
      const createDocumentationService = new CreateDocumentationService(entityManager);
  
      // Use o serviço para buscar registros com base no filtro
      const documents = await createDocumentationService.findByNameDocument(nameDocument);
  
      return res.status(200).json({ message: "Documentos encontrados", data: documents });
    } catch (error) {
      console.error("Erro no handleFilter:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
  
  async handleDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
  
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Parâmetro 'id' é obrigatório e deve ser uma string." });
      }
  
      const entityManager = this.orm.em.fork();
      const createDocumentationService = new CreateDocumentationService(entityManager);
  
      // Use o serviço para deletar o registro
      const deleted = await createDocumentationService.delete(id);
  
      if (!deleted) {
        return res.status(404).json({ message: "Documento não encontrado" });
      }
  
      return res.status(204).send();
    } catch (error) {
      console.error("Erro no handleDelete:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
  }
  
}
}

