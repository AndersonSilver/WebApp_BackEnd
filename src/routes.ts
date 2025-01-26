import { Router } from "express";
import { MikroORM } from "@mikro-orm/core";
import { CreateDocumentationController } from "./controllers/APIs/created-documentation-controller";

async function createRouter() {
  try {
    const orm = await MikroORM.init();
    console.log("MikroORM inicializado com sucesso.");

    const createDocumentationController = new CreateDocumentationController(orm);

    const router = Router();

    router.post("/documentacao", (req, res) =>
      createDocumentationController.handlePost(req, res)
    );

    router.get("/documentacao", (req, res) =>
      createDocumentationController.handleGet(req, res)
    );

    // Adiciona a rota para filtrar por nameDocument
    router.get("/documentacao/filter", (req, res) =>
      createDocumentationController.handleFilter(req, res)
    );

    // Adiciona a rota para deletar um registro
    router.delete("/documentacao/:id", (req, res) =>
      createDocumentationController.handleDelete(req, res)
    );

    return router;
  } catch (error) {
    console.error("Erro ao inicializar MikroORM:", error);
    throw error;
  }
}

export const routerPromise = createRouter();

