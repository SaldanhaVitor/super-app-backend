import { v4 as uuidv4 } from 'uuid';
import { ClientResponseDto } from '../dto/client-response.dto';

export const FIND_ALL_CLIENTS: ClientResponseDto[] = [
  {
    id: uuidv4(),
    name: 'any_name',
    email: 'any_email',
  },
  {
    id: uuidv4(),
    name: 'any_name_2',
    email: 'any_email_2',
  },
  {
    id: uuidv4(),
    name: 'any_name_3',
    email: 'any_email_3',
  },
];
