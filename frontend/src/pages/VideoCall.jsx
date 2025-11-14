import { useState, useRef, useEffect } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
} from "lucide-react";

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [remoteUserName, setRemoteUserName] = useState("John Doe");

  useEffect(() => {
    // Initialize local video stream
    if (isCallActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    } else {
        navigator.mediaDevices.getUserMedia({video:false,audio:false});
    }
  }, [isCallActive]);

  const toggleCamera = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    if (localVideoRef.current?.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsMicOn(!isMicOn);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    // Stop media stream
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-base-300 to-base-200 flex flex-col">
      {/* Header */}
      <div className="bg-base-100 shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Video className="w-5 h-5 text-primary-content" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Video Call</h1>
            <p className="text-xs text-gray-500">
              {isCallActive ? "🟢 Active" : "🔴 Ready to call"}
            </p>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 overflow-hidden">
        {!isCallActive ? (
          // No Call State
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center animate-pulse">
              <Video className="w-12 h-12 text-gray-500" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Ready for a call?</h2>
              <p className="text-gray-600 mb-6">
                Start a video call with your contact
              </p>
              <button
                onClick={handleStartCall}
                className="btn btn-primary btn-lg gap-2"
              >
                <Phone className="w-5 h-5" />
                Start Call
              </button>
            </div>
          </div>
        ) : (
          // Active Call State
          <div className="w-full h-full flex flex-col lg:flex-row gap-4 max-w-6xl">
            {/* Remote Video (Main) */}
            <div className="flex-1 bg-black rounded-lg overflow-hidden shadow-lg relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm">
                {remoteUserName}
              </div>
            </div>

            {/* Local Video (PIP) */}
            <div className="w-full lg:w-60 h-40 lg:h-auto bg-black rounded-lg overflow-hidden shadow-lg relative">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-xs">
                You
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-base-100 shadow-lg px-6 py-4 flex items-center justify-center gap-4">
        {isCallActive && (
          <>
            {/* Mic Toggle */}
            <button
              onClick={toggleMic}
              className={`btn btn-circle btn-lg ${
                isMicOn ? "btn-ghost" : "btn-error"
              }`}
              title={isMicOn ? "Mute" : "Unmute"}
            >
              {isMicOn ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </button>

            {/* Camera Toggle */}
            <button
              onClick={toggleCamera}
              className={`btn btn-circle btn-lg ${
                isCameraOn ? "btn-ghost" : "btn-error"
              }`}
              title={isCameraOn ? "Turn off camera" : "Turn on camera"}
            >
              {isCameraOn ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </button>

            {/* Settings */}
            <button
              className="btn btn-circle btn-lg btn-ghost"
              title="Settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </>
        )}

        {/* End Call */}
        <button
          onClick={isCallActive ? handleEndCall : handleStartCall}
          className={`btn btn-circle btn-lg ${
            isCallActive ? "btn-error" : "btn-success"
          }`}
          title={isCallActive ? "End call" : "Start call"}
        >
          {isCallActive ? (
            <PhoneOff className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;