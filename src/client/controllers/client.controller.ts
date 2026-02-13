import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientDto } from '../dto/client.dto';

@ApiTags('client')
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' })
    @ApiResponse({ status: 201, type: ClientDto })
    create(@Body() createClientDto: CreateClientDto): Promise<ClientDto> {
        return this.clientService.create(createClientDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los clientes' })
    @ApiResponse({ status: 200, type: [ClientDto] })
    findAll(): Promise<ClientDto[]> {
        return this.clientService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por ID' })
    @ApiResponse({ status: 200, type: ClientDto })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<ClientDto> {
        return this.clientService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un cliente' })
    @ApiResponse({ status: 200, type: ClientDto })
    remove(@Param('id', ParseIntPipe) id: number): Promise<ClientDto> {
        return this.clientService.softDelete(id);
    }
}
