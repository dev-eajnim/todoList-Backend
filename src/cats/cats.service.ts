import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
      @InjectRepository(Cat)
      private catRepository: Repository<Cat>
  ) {}
  
  create(createCatDto: CreateCatDto) {
    console.log(createCatDto)
    const cat = this.catRepository.create(createCatDto);
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  findOne(id: number) {
    // const findOptions: FindOneOptions<Cat> = {
    //   where: { id }
    // }
    return this.catRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    let cat = await this.findOne(id)
    if(!cat) throw new NotFoundException()
    cat = {...cat, ...updateCatDto }
    return this.catRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    let cat = await this.findOne(id)
    if(!cat) throw new NotFoundException()
    this.catRepository.remove(cat);
  }

  async toggle(id: number): Promise<boolean> {
    // todo 일단 아이디로 가져와
    // 가져온 캣에 done과 반대로 해서 저장 !true
    // 저장된 done상태를 리턴
    let cat = await this.catRepository.findOne({where: {id}})
    if(cat.done){
      cat = {
        ...cat,
        done:cat.done}

      // this.catRepository.save(cat) // 엔티티가 들어가야 한다. 위에는 오브젝트
      return cat.done
    }else{
      return !(cat.done)
    }
  }
}
