import { ClientDto } from '../dto/client.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';

export class ClientMapper {
    static toDto(client: Client): ClientDto {
        return {
            id: client.id,
            name: client.name,
            lastname: client.lastname,
        };
    }

    static toEntity(dto: CreateClientDto): Omit<Client, 'id'> {
        return {
            name: dto.name,
            lastname: dto.lastname,
        };
    }
}
