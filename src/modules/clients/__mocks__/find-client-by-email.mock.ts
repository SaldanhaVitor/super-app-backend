import { v4 as uuidv4 } from 'uuid';
import { ClientResponseDto } from '../dto/client-response.dto';

export const EXISTENT_CLIENT: ClientResponseDto = {
  id: uuidv4(),
  name: 'any_name',
  email: 'any_email',
};
