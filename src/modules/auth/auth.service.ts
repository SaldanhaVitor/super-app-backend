import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateClient(email: string, password: string): Promise<any> {
    let client: Client;
    try {
      client = await this.clientService.findOneToAuthorize(email);
    } catch (error) {
      return null;
    }
    const isClientPassword = client.password === password;
    if (!isClientPassword) {
      return null;
    }
    return client;
  }

  async login(client: Client): Promise<any> {
    const jwtPayload = { sub: client.id, email: client.email };
    return { Authorization: this.jwtService.sign(jwtPayload) };
  }
}
