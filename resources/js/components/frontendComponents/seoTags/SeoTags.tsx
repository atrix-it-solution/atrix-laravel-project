import React from "react";
import { Helmet } from "react-helmet-async";

interface SeoTagsProps {
  title: string;
  description: string;
  keywords?: string; 
}

const SeoTags: React.FC<SeoTagsProps> =({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

    </Helmet>
  );
};

export default SeoTags;
