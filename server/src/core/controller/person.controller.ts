import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterPersonDTO } from "../dto/register-person.dto";
import { Person } from "../model/person.entity";
import { PersonService } from "../service/person.service";

@Controller('users')
export class PersonController {

    constructor(private personService: PersonService) { }

    @Get()
    findAll(): Promise<Person[]> {
        return this.personService.findAll();
    }

    @Post('register')
    register(@Body() registerPersonDTO: RegisterPersonDTO): Promise<Person> {
        return this.personService.register(registerPersonDTO);
    }
}