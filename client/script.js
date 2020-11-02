navigator.mediaDevices.getUserMedia({audio:true, video:true}).then(stream => localVideo.srcObject = stream)
