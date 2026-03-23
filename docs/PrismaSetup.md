1. Install Dependencies
In your project terminal, install the Prisma CLI as a development tool and the Client for your actual code:

Bash
# Install Prisma CLI as a dev dependency
npm install prisma --save-dev

# Install the Prisma Client for querying
npm install @prisma/client



2. Initialize Prisma
Run the following command to create the necessary files. This will generate a prisma/ folder and a .env file in your root directory.

Bash
npx prisma init --datasource-provider postgresql



3. Update your Prisma Client (lib/prisma.ts)
Since you are not using "Prisma Accelerate" (a paid cloud tool) and are working locally, you need to tell the client to connect directly to your database using a driver adapter.

First, install the PG driver:

Bash
npm install pg
npm install --save-dev @types/pg