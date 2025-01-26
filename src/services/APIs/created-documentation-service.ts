import { EntityManager } from "@mikro-orm/core";
import { WebApp, Status } from "../../tables/webapp.entity";

interface RequestProps {
  nameDocument: string;
  file: string;
  descricao: string;
  status: Status; // Aceita apenas os valores da enumeração
  titulo: string;
  responsavel: string
}

export class CreateDocumentationService {
  constructor(private readonly em: EntityManager) {}

  async execute({
    nameDocument,
    file,
    descricao,
    status,
    titulo,
    responsavel
  }: RequestProps) {
    // Cria a instância da entidade WebApp
    const webAppEntry = new WebApp();

    webAppEntry.nameDocument = nameDocument;
    webAppEntry.file = file;
    webAppEntry.descricao = descricao;
    webAppEntry.status = status;
    webAppEntry.titulo = titulo;
    webAppEntry.responsavel = responsavel;

    // Persiste e salva no banco de dados
    await this.em.persistAndFlush(webAppEntry);

    // Retorna o resultado
    return {
      message: "Documento salvo com sucesso",
      data: webAppEntry,
    };
  }

  async findAll() {
    // Busca todos os registros da entidade WebApp
    return await this.em.find(WebApp, {});
  }

  async findByNameDocument(nameDocument: string) {
    // Usa um operador `LIKE` para permitir busca parcial e insensível a maiúsculas/minúsculas
    return await this.em.find(WebApp, {
      nameDocument: { $ilike: `%${nameDocument}%` }, // Insensível a maiúsculas/minúsculas
    });
  }

  async delete(id: string) {
    // Busca o registro pelo ID
    const webAppEntry = await this.em.findOne(WebApp, { id });

    // Se não encontrar, retorna um erro
    if (!webAppEntry) {
      throw new Error("Documento não encontrado");
    }

    // Remove o registro do banco de dados
    await this.em.removeAndFlush(webAppEntry);

    // Retorna o resultado
    return {
      message: "Documento removido com sucesso",
    };
  }
}
