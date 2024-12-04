import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { shortenUrlDto } from 'src/dtos/url.dto';

@Controller()
export class UrlController {

    constructor(private service: UrlService) {

    }

    @Post('shorten')
    shortenUrl(@Body() url:shortenUrlDto) {
        
        return this.service.shortenUrl(url)
    }

    @Get(':code')
    async redirect(@Res() res, @Param('code') code: string) {
        const url  = await this.service.redirect(code)
        return res.redirect(url.longUrl)
    }   
}
