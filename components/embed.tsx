import React from 'react';

interface IframeEmbedProps {
  src: string;
  title: string;
}

const IframeEmbed: React.FC<IframeEmbedProps> = ({
  src,
  title,
}) => (
  <div className="flex justify-center items-center w-full h-screen">
    <div className="w-[75vw] h-[75vh] overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  </div>
);

export default IframeEmbed;