import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  type: string;
}

const SEO: React.FC<SeoProps> = ({ title, description, type }) => {
  return (
    <Helmet>
      <title>{title} | DevConnector</title>
      <meta name="description" content={description} />
      {/* Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | DevConnector`} />
      <meta property="og:description" content={description} />
      {/* End Facebook */}
    </Helmet>
  );
};

export default SEO;
