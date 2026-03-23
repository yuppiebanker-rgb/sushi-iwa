import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const BASE = 'https://sushiiwa.mx';

export default function SEO({ title, description, path, image = '/images/chef-rolling.jpg' }: Props) {
  const url = `${BASE}${path}`;
  const img = `${BASE}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="es_MX" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}
