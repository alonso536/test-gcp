import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;
}
