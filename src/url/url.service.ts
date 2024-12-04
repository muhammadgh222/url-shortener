import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { shortenUrlDto } from 'src/dtos/url.dto';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url) private repo: Repository<Url>
    ) {}

    async shortenUrl (url: shortenUrlDto) {
        const {longUrl} = url;

        if(!isURL(longUrl)) {
            throw new BadRequestException('String must be a valid url!')
        }

        const urlCode = nanoid(10)
        const baseUrl = 'http://localhost:3000'

        try {
            let url = await this.repo.findOneBy({longUrl})

            if(url) return url.shortenedUrl

            const shortenedUrl = `${baseUrl}/${urlCode}`

            url = this.repo.create({
                urlCode,
                longUrl,
                shortenedUrl
            })

            this.repo.save(url)

            return url.shortenedUrl
        } catch (error) {
            console.log(error)

            throw new UnprocessableEntityException('Server Error!')
        }
    }

    async redirect (urlCode: string) {
        try {
            const url = await this.repo.findOneBy({urlCode})
            if(url) return url
        } catch (error) {
            console.log(error);
      throw new NotFoundException('Resource Not Found');
            
        }
    }
}
