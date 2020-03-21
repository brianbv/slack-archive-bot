import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { ArchiveRepository } from '../repository/ArchiveRepository';

export class ViewerApp
{
    readonly app = express(); 
  
    readonly archiveRepository = new ArchiveRepository();

    public start():void{
        this.mapRoutes();

        this.app.use(bodyParser.urlencoded({extended:true})) //parse post data
        .use(bodyParser.json())
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'ejs');

        this.app.listen(5000,()=>{
            console.log("Express listening on port 5000");
        });
        
    }

    public mapRoutes():void{

        this.app.get('/', (request,response)=>{
            let data={conversations: this.archiveRepository.getArchivedConversations()};
            response.render('conversationList',data);
        });

        this.app.get('/conversation/:id', (request, response) => {
            response.send(this.archiveRepository.getConversationDataById(request.params.id));
          });
    }



     

}

