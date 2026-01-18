import { config } from 'dotenv'
import path from 'path'

// Carica le variabili d'ambiente da .env
config({ path: path.join(process.cwd(), '.env') })

const prismaConfig = {
  datasource: {
    url: process.env.DATABASE_URL!
  }
}

export default prismaConfig