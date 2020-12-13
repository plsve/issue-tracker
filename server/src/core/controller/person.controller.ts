import { Controller, Get, Post } from "@nestjs/common";
import { Person } from "../model/person.entity";
import { PersonService } from "../service/person.service";

@Controller('users')
export class PersonController {

    constructor(private personService: PersonService) { }

    @Get()
    findAll(): Promise<Person[]> {
        return this.personService.findAll();
    }

    @Post()
    register(): Promise<Person[]> {
        return this.personService.findAll();
    }
}