import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webrtc';
  targetPeer: any;
  peer: any;
  @ViewChild('myVideo') myVideo: ElementRef;
   nav = <any>navigator;

   ngOnInit() {
    const video = this.myVideo.nativeElement;
    let peerx: any;
    this.nav.getUserMedia = (this.nav.getUserMedia || this.nav.webkitGetUserMedia || this.nav.mozGetUserMedia || this.nav.msGetUserMedia);
    this.nav.getUserMedia({audio: true, video: true}, function(stream) {
    peerx = new SimplePeer({
      initiator: location.hash === '#init',
      trickle: false,
      iceTransportPolicy: 'relay',
      stream: stream
    });
    peerx.on('signal', function(data) {
        console.log(JSON.stringify(data));
        this.targetPeer = data;
    });
    peerx.on('data', function(data) {
      console.log('Received Message:' + data);
    });
    peerx.on('stream', function (stream) {
      video.srcObject = stream;
      // video.src = URL.createObjectURL(stream);
      video.play();
    });
  }, function (err) {
    console.log(err);
  });
    setTimeout(() => {
       this.peer = peerx;
       console.log(this.peer);
     }, 5000);
  }

  connect() {
    this.peer.signal(JSON.parse(this.targetPeer));
  }

  message() {
    this.peer.send('Hello world');
  }
}
