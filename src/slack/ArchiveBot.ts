import {App, AppMentionEvent} from '@slack/bolt';
import {WebClient, WebAPICallResult} from '@slack/web-api';
import fs from 'fs';
import { ArchiveRepository } from '../repository/ArchiveRepository';
import { ArchivedConversation } from '../repository/ArchivedConversation';


export class ArchiveBot
{
    // Initializes your app with your bot token and signing secret
    readonly app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET
        });
        
    readonly client = new WebClient(process.env.SLACK_BOT_TOKEN);

    readonly repository = new ArchiveRepository();

    public start(){
    
    (async () => {
        // Start your app
        this.mapRoutes();

        await this.app.start(process.env.PORT || 3000);
        console.log('ArchiveBot is running! 💬🤖');
    })();
    } 

 
    private archiveConversation(event:AppMentionEvent,result:any)
    {
        this.repository.archiveConversation(new ArchivedConversation(event.channel,event.user,"Archived Conversation"),result);
        console.log("archived!");
    }

    private mapRoutes()
    {
        this.app.error((error) => {
            // Check the details of the error to handle cases where you should retry sending a message or stop the app
            console.error(error);
        });
        
        this.app.event('app_mention', ({event,say})=> {
            console.log("-- app_mention hit");
                     
            this.client.conversations.history({channel:event.channel}).then( (result)=>{
                this.archiveConversation(event,result);
                say(`Archived conversation <@${event.user}> `);
            });
        });
        
    
    }
}