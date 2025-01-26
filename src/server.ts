import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { routerPromise } from "./routes"; // Importe a Promise
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware de Logging
app.use(morgan("combined"));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
app.use(express.json({ limit: "1000mb" }));
app.use(cors());

// Middleware de Log de Tamanho do Body
app.use((req, res, next) => {
  const bodySize = JSON.stringify(req.body).length;
  console.log(
    `Recebido ${req.method} ${req.url} - Tamanho do Body: ${bodySize} bytes`
  );
  next();
});

// Esperar até que o roteador esteja criado antes de usá-lo
(async () => {
  try {
    const router = await routerPromise; // Await na Promise do roteador
    app.use(router);

    // Middleware de Tratamento de Erros
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack || err);
      if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
          error: "Invalid JSON payload",
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });

    // Inicialização do Servidor
    const server = app.listen(PORT, () => {
      console.info(`⚡️Server is running at http://localhost:${PORT}`);
    });
    server.setTimeout(3 * 60 * 1000); // 3 minutos
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
})();