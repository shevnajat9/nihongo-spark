/**
 * WebRTC Peer-to-Peer Signaling & DataChannel Helper
 * Enables serverless direct browser-to-browser connections using standard WebRTC APIs
 * with public Google STUN fallback and BroadcastChannel for seamless local multi-tab duels.
 */

const STUN_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export class P2PPeer {
  constructor(onMessage, onStatusChange) {
    this.peerConnection = null;
    this.dataChannel = null;
    this.onMessage = onMessage || (() => {});
    this.onStatusChange = onStatusChange || (() => {});
    this.broadcastChannel = null;

    // Local BroadcastChannel for effortless same-machine testing
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('nihongo_spark_duel_channel');
        this.broadcastChannel.onmessage = (event) => {
          this.onMessage(event.data);
        };
      }
    } catch {
      // BroadcastChannel unavailable
    }
  }

  // Initialize Host (Player 1)
  async createHostOffer() {
    this.peerConnection = new RTCPeerConnection(STUN_SERVERS);
    this.dataChannel = this.peerConnection.createDataChannel('nihongo_duel_channel');
    this.setupDataChannel(this.dataChannel);

    return new Promise((resolve) => {
      this.peerConnection.onicecandidate = (event) => {
        if (!event.candidate) {
          // ICE gathering finished, return compressed offer string
          const offerString = btoa(JSON.stringify(this.peerConnection.localDescription));
          resolve(offerString);
        }
      };

      this.peerConnection.createOffer()
        .then((offer) => this.peerConnection.setLocalDescription(offer))
        .catch((err) => console.error('Error creating offer:', err));
    });
  }

  // Guest (Player 2) receives Host offer and generates Answer
  async createGuestAnswer(offerBase64) {
    this.peerConnection = new RTCPeerConnection(STUN_SERVERS);

    this.peerConnection.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.setupDataChannel(this.dataChannel);
    };

    const offerObj = JSON.parse(atob(offerBase64));
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerObj));

    return new Promise((resolve) => {
      this.peerConnection.onicecandidate = (event) => {
        if (!event.candidate) {
          const answerString = btoa(JSON.stringify(this.peerConnection.localDescription));
          resolve(answerString);
        }
      };

      this.peerConnection.createAnswer()
        .then((answer) => this.peerConnection.setLocalDescription(answer))
        .catch((err) => console.error('Error creating answer:', err));
    });
  }

  // Host accepts Guest Answer
  async acceptGuestAnswer(answerBase64) {
    if (!this.peerConnection) return;
    const answerObj = JSON.parse(atob(answerBase64));
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answerObj));
  }

  setupDataChannel(dc) {
    dc.onopen = () => {
      this.onStatusChange('connected');
    };
    dc.onclose = () => {
      this.onStatusChange('disconnected');
    };
    dc.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        this.onMessage(parsed);
      } catch {
        this.onMessage(event.data);
      }
    };
  }

  // Send payload over either WebRTC DataChannel or BroadcastChannel
  send(payload) {
    const dataStr = JSON.stringify(payload);
    let sent = false;

    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(dataStr);
      sent = true;
    }

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(payload);
      sent = true;
    }

    return sent;
  }

  cleanup() {
    if (this.dataChannel) this.dataChannel.close();
    if (this.peerConnection) this.peerConnection.close();
    if (this.broadcastChannel) this.broadcastChannel.close();
  }
}
