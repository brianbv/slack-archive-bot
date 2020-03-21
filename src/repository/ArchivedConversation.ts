
export class ArchivedConversation
{
    public archiveDate : Date;
    
    constructor(
        public conversationId : string,        
        public archivedBy : string = "",
        public summary : string =""){
            this.archiveDate=new Date();
        }



}