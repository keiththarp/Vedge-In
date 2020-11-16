import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterChoice } from './characterchoice.entity';
import { CreateCharacterChoiceDTO } from './dto/create-characterchoice.dto';


@Injectable()
export class CharacterchoicesService {
    constructor(
        @InjectRepository(CharacterChoice)
        private readonly characterchoiceRepository: Repository<CharacterChoice>
    ) {}

    create(createcharacterchoiceDTO: CreateCharacterChoiceDTO): Promise<CharacterChoice> {
        const newCharacter = new CharacterChoice();
        newCharacter.monster_type = createcharacterchoiceDTO.monster_type;
        newCharacter.startingSTR = createcharacterchoiceDTO.startingSTR;
        newCharacter.startingDEX = createcharacterchoiceDTO.startingDEX;
        newCharacter.startingINT = createcharacterchoiceDTO.startingINT;
        newCharacter.image = createcharacterchoiceDTO.image;

        return this.characterchoiceRepository.save(newCharacter);
    }

    findAll(): Promise<CharacterChoice[]> {
        return this.characterchoiceRepository.find();
      }
    
      findOne(id: string): Promise<CharacterChoice> {
        return this.characterchoiceRepository.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.characterchoiceRepository.delete(id);
      }
}