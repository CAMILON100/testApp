import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';

import { MyService } from '../../providers/myService';
declare var require: any;
(window as any).global = window;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  sendData:any;
 
  images = [
   'https://css.adelgazarencasa.co/wp-content/uploads/2019/01/escalador-de-montan%CC%83a.gif',
   'https://www.yomeentreno.com/wp-content/uploads/2019/02/01_escaladores-480x369.gif',
   'https://i.pinimg.com/originals/3d/1d/83/3d1d83315d246dee72c9c63639479852.gif', 
   'https://i.pinimg.com/originals/39/91/a2/3991a253e2f8e41e2d2044ca45109208.gif',
   'https://css.adelgazarencasa.co/wp-content/uploads/2019/01/escalador-de-montan%CC%83a.gif',
   'https://www.yomeentreno.com/wp-content/uploads/2019/02/01_escaladores-480x369.gif',
   'https://i.pinimg.com/originals/ba/4a/ac/ba4aac92e0bf005baecf228496b6803c.gif'
   ];

  constructor(public popoverCtrl: PopoverController,public myService: MyService) { 


       

       this.myService.apiData('GET','/api/access_token', '', null).subscribe(  

          (result) => {
          



            const { connect, createLocalVideoTrack } = require('twilio-video');
    
            connect(result, { name: 'cool room' }).then(room => {
    
                console.log(`Successfully joined a Room: ${room}`);
    
                const videoChatWindow = document.getElementById('video-chat-window');
    
                //emisor
                createLocalVideoTrack().then(track => {
                    videoChatWindow.appendChild(track.attach());
                });
    
                /// receptor
                room.on('participantConnected', participant => {
                    console.log(`Participant "${participant.identity}" connected`);
    
    
                    participant.tracks.forEach(publication => {
                        if (publication.isSubscribed) {
                            const track = publication.track;
                            videoChatWindow.appendChild(track.attach());
                        }
                    });
    
                    participant.on('trackSubscribed', track => {
                        videoChatWindow.appendChild(track.attach());
                    });
                });
          });
        },
            //revisar esto 
          (error) => {console.log(error);}

        );


  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}
