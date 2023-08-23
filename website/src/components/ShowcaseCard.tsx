import React from 'react';

type ShowcaseCardProps = {
  title: string;
  url: string;
  imageUrl: string;
};

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  url,
  imageUrl,
  title,
}) => (
  <a href={url} target="_blank">
    <div
      className="flex border border-gray-400 rounded-3xl p-4 w-64 h-48 flex-col items-center justify-center shadow-2xl bg-cover bg-center relative overflow-hidden hover:brightness-110 active:scale-95 transition-all"
      style={{backgroundImage: `url(${imageUrl})`}}
    >
      <div className="absolute top-0 right-0 px-2 bg-white rounded shadow-lg font-bold">
        {title}
      </div>
    </div>
  </a>
);
