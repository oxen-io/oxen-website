export type IAuthor = {
  name: string;
  phone: string;
  shortBio: string;
  title: string;
  email: string;
  twitter: string;
  facebook: string;
  github: string;
};

export type IFigureImage = {
  imageUrl: string;
  description: string;
  title: string;
};

export type IPost = {
  id: string;
  body: string;
  publishedDate: string;
  slug: string;
  tags: Array<string>;
  title: string;
  subtitle: string;
  featureImage?: IFigureImage;
  author?: IAuthor;
};
