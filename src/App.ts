import {ArchiveBot} from './slack/ArchiveBot';
import { ViewerApp } from './viewer/ArchiveViewer';

function run()
{
    let bot = new ArchiveBot();
    bot.start();

    let viewerApp = new ViewerApp();
    viewerApp.start();
}

run();