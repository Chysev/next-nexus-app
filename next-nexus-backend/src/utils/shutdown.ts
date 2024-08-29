import { disconnectPrisma } from "../lib/prisma";

const Shutdown = async () => {
  console.log(`Worker ${process.pid}: Shutting down gracefully...`);
  try {
    await disconnectPrisma();
    console.log(`Worker ${process.pid}: Prisma disconnected`);
    process.exit(0);
  } catch (err) {
    console.error(`Worker ${process.pid}: Error during shutdown`, err);
    process.exit(1);
  }
};

export default Shutdown;
