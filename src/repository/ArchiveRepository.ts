import {ArchivedConversation} from './ArchivedConversation'
import fs from 'fs';

export class ArchiveRepository
{
    private get conversationPath():string {
        return this.basePath + "archive/conversation";
    }

    private get conversationListPath():string {
        return this.basePath + "archive/list.json";
    }
    constructor(
        public basePath:string="./"
    ){

        if(!fs.existsSync(this.conversationPath))
        {
            fs.mkdirSync(this.conversationPath);
            fs.writeFileSync(this.conversationListPath,"[]");
        }
    }

    public archiveConversation(conversation:ArchivedConversation,data:any ) :void
    {
        let conversationList=this.getArchivedConversations();

        fs.writeFileSync(this.conversationPath + "/" + conversation.conversationId + ".json", JSON.stringify(data) );
        let convo : ArchivedConversation= this.getFirstConverstaion(conversation.conversationId,conversationList);

        if (convo==null)
        {
            conversationList.push(conversation);
        }
        else {
            convo.archiveDate= new Date();
        }

        fs.writeFileSync(this.conversationListPath,JSON.stringify(conversationList),"utf8");
    }

    protected getFirstConverstaion(id,list:ArchivedConversation[]) : any
    {
        list.filter(f=> f.conversationId==id);

        if (list.length>0) {
            return list[0];
        }

        return null;
    }

    public getConversationDataById(id:string) : any {
       let data= fs.readFileSync(this.conversationPath + "/" + id + ".json", "utf8" ).toString();
       return data;
    }

    public getConversationById(id:string) : any
    {
        return this.getFirstConverstaion(id,this.getArchivedConversations());
    }

    public getArchivedConversations(): ArchivedConversation[]
    {
        //read list of stored conversation metadats and return them
        let data= fs.readFileSync(this.conversationListPath,"utf8").toString();
        let conversations:ArchivedConversation[] = JSON.parse(data) as ArchivedConversation[];

        return conversations;
    }
}