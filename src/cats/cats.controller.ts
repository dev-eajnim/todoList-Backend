import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { identity } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.catsService.remove(+id);
  }

  @Patch(':id/toggle')
  async toggle(@Param('id', ParseIntPipe) id: number) : Promise<{done:boolean}>{
  return {done: await this.catsService.toggle(id)};
  }
}
