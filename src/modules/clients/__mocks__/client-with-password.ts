import { v4 as uuidv4 } from 'uuid';
import { Client } from '../entities/client.entity';

export const EXISTENT_CLIENT_WITH_PASSWORD: Client = {
  id: uuidv4(),
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
};
