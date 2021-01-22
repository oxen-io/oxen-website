export interface IAuthor {
  name: string;
  link: string;
  description: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IFigureImage {
  source: string;
  altText: string;
  description: string;
}

// The return type of an article fetched from SanityIO
export interface ISanityArticle {
  id: string;
  updatedAt: string;
  title: string;
  subtitle: string;
  author: IAuthor;
  publishedAt: string;
  city: string;
  tags: Array<string>;
  backdropSVG: string;
  body: string;
  location: ILocation;
  category: string;
  slug: string;
  paragraph: string;
  featureImage: IFigureImage;
}

// The type of ArticleProps; only essential article information
export interface IArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: IAuthor;
  date: string;
  city: string;
  tags: Array<string>;
  body: string;
  location: ILocation;
  category: string;
  paragraph: string;
  featureImage: IFigureImage;
}
