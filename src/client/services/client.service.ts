import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientDto } from '../dto/client.dto';
import { ClientMapper } from '../mappers/client.mapper';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) { }

    async create(createClientDto: CreateClientDto): Promise<ClientDto> {
        const data = ClientMapper.toEntity(createClientDto);
        const created = await this.prisma.client.create({
            data: data as any,
        });

        return created;
    }

    async findAll(): Promise<ClientDto[]> {
        const clients = await this.prisma.client.findMany({});
        return clients.map(c => ClientMapper.toDto(c));
    }

    async findOne(id: number): Promise<ClientDto> {
        const client = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!client) throw new NotFoundException('Client not found');
        return ClientMapper.toDto(client);
    }

    async softDelete(id: number): Promise<ClientDto> {
        const deleted = await this.prisma.client.delete({
            where: { id },
        });
        return ClientMapper.toDto(deleted);
    }
}
