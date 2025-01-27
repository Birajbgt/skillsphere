import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./VideoCall.css";

const socket = io("http://localhost:4000");

const VideoCall = ({ roomId, onLeave }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef({});
  const [peers, setPeers] = useState({});

  useEffect(() => {
    const localStreamPromise = navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    let localStream;

    const createPeerConnection = (socketId) => {
      const peerConnection = new RTCPeerConnection();
      localStream.getTracks().forEach((track) =>
        peerConnection.addTrack(track, localStream)
      );
      peerConnection.ontrack = (event) => {
        if (!remoteVideoRefs.current[socketId]) {
          remoteVideoRefs.current[socketId] = React.createRef();
        }
        const [stream] = event.streams;
        remoteVideoRefs.current[socketId].current.srcObject = stream;
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { socketId, candidate: event.candidate });
        }
      };
      setPeers((prev) => ({ ...prev, [socketId]: peerConnection }));
      return peerConnection;
    };

    const handleNewPeer = async (socketId, offer) => {
      const peerConnection = createPeerConnection(socketId);
      if (offer) {
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("peer-answer", { socketId, answer });
      }
    };

    localStreamPromise
      .then((stream) => {
        localStream = stream;
        localVideoRef.current.srcObject = stream;
        socket.emit("join-room", { roomId });
      })
      .catch(console.error);

    socket.on("user-joined", ({ socketId }) => handleNewPeer(socketId));
    socket.on("peer-answer", (data) => handleNewPeer(data.socketId, data.answer));

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      Object.values(peers).forEach((peer) => peer.close());
      socket.emit("leave-room", { roomId });
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div className="video-call-container">
      <div className="video-container">
        <video ref={localVideoRef} autoPlay playsInline muted className="local-video" />
        {Object.entries(remoteVideoRefs.current).map(([socketId, ref]) => (
          <video key={socketId} ref={ref} autoPlay playsInline className="remote-video" />
        ))}
      </div>
      <button onClick={onLeave}>Leave Call</button>
    </div>
  );
};
VideoCall.propTypes = {
  roomId: PropTypes.string.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default VideoCall;
