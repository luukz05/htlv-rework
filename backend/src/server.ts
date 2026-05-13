import { createApp } from "./routes/index.js";
import { getDb } from "./db/client.js";

const port = Number(process.env.PORT || 4000);
const app = createApp();

getDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
