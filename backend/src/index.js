const app = require("./app");
const { logger } = require("./utils/logger");

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
