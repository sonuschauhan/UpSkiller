import { useEffect, useRef } from 'react';
import cloudinary from 'cloudinary-video-player';
import 'cloudinary-video-player/cld-video-player.min.css';

const VideoPlayer = ({ id, publicId, playerConfig = {}, sourceConfig = {}, ...props }) => {
  const cloudinaryRef = useRef();
  const playerRef = useRef();
  const instanceRef = useRef();

  // ✅ Initialize the player ONCE
  useEffect(() => {
    if (!cloudinaryRef.current) {
      cloudinaryRef.current = cloudinary;
      instanceRef.current = cloudinary.videoPlayer(playerRef.current, {
        cloud_name: 'ddypyaqy4',
        secure: true,
        controls: true,
        ...playerConfig,
      });
    }
  }, []);

  // ✅ Update video source when publicId changes
  useEffect(() => {
    if (instanceRef.current && publicId) {
      instanceRef.current.source(publicId, sourceConfig);
    }
  }, [publicId, sourceConfig]);

  return (
    <video
      ref={playerRef}
      id={id}
      className="cld-video-player cld-fluid"
      {...props}
    />
  );
};

export default VideoPlayer;
  
  
  
  
  
  // import { useEffect, useRef } from 'react';
  // import cloudinary from 'cloudinary-video-player';
  // import "cloudinary-video-player/cld-video-player.min.css";

  // const VideoPlayer = ({ id, publicId, playerConfig, sourceConfig, ...props }) => {
  //   console.log(publicId);
  //   const cloudinaryRef = useRef();
  //   const playerRef = useRef();

  //   useEffect(() => {
  //     if (cloudinaryRef.current) return;

  //     cloudinaryRef.current = cloudinary;

  //     const player = cloudinaryRef.current.videoPlayer(playerRef.current, {
  //       cloud_name: "ddypyaqy4",
  //       secure: true,
  //       controls: true,
  //       ...playerConfig,
  //     });
  //     player.source(publicId, sourceConfig);
  //   }, [publicId, playerConfig, sourceConfig]);

  //   return (
  //     <video
  //       ref={playerRef}
  //       id={id}
  //       className="cld-video-player cld-fluid"
  //       {...props}
  //     />
  //   );
  // };

  // // ✅ Add this
  // export default VideoPlayer;















  