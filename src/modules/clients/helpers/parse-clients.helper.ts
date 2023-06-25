import { ClientResponseDto } from '../dto/client-response.dto';
import { Client } from '../entities/client.entity';

export const ParseClients = (clients: Client[]): ClientResponseDto[] => {
  const allClients = [];
  for (const client of clients) {
    allClients.push({ id: client.id, name: client.name, email: client.email });
  }
  return allClients;
};

export const ParseClient = (client: Client): ClientResponseDto => {
  return { id: client.id, name: client.name, email: client.email };
};
