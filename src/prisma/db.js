import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import { config } from '#config';
import contractJson from './contract.json' with { type: 'json' };

const contract = contractFromJson(contractJson);

export const db = postgres({
  contract,
  url: config.DATABASE_URL,
});
