// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020

export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`;

export const metaTagsFragment = `
  fragment metaTagsFragment on Tag {
    attributes
    content
    tag
  }
`;

export const pageFragment = `
  fragment pageFragment on PageRecord {
    header
    subheader
    body(markdown: true)
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
`;
