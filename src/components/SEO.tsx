import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
  noindex?: boolean;
}

const BASE = 'https://sushiiwa.mx';
const DEFAULT_KEYWORDS = 'sushi monterrey, sushi san pedro garza garcia, restaurante japones monterrey, sushi spgg, mejor sushi monterrey, sushi iwa, japonés san pedro, curricanes monterrey, hamachi jalapeño, rollos especiales monterrey';

export default function SEO({
  title,
  description,
  path,
  image = '/images/chef-rolling.jpg',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}: Props) {
  const url = `${BASE}${path}`;
  const img = `${BASE}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Sushi IWA" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="MX-NL" />
      <meta name="geo.placename" content="San Pedro Garza García, Nuevo León" />
      <meta name="geo.position" content="25.6541;-100.3677" />
      <meta name="ICBM" content="25.6541, -100.3677" />
    </Helmet>
  );
}
