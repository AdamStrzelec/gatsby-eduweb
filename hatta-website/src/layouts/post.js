import React from 'react';
import Image from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

export const query = graphql`
query querySingleArticle($id: String!) {
    datoCmsArticle(id: {eq: $id}) {
      title
      author
      featuredImage {
        fixed(width: 500){
          ...GatsbyDatoCmsFixed
        }
      }
      articleContent {
        __typename
        ... on DatoCmsParagraph {
          paragraphContent
          id
        }
        ... on DatoCmsHeading {
          headingContent
          id
        }
        ... on DatoCmsArticleImage {
          imageData {
            fixed(width: 500){
              ...GatsbyDatoCmsFixed
            }
            
          }
          id
        }
      }
    }
  }
`

const PostLayout = ({ data }) => {

    return(
        <div>
            {/* {console.log(props)} */}
            <h1>{data.datoCmsArticle.title}</h1>
            <p>{data.datoCmsArticle.author}</p>
            <Image fixed={data.datoCmsArticle.featuredImage.fixed} />
            {/* <Image fixed={data.mdx.frontmatter.featuredImage.childImageSharp.fixed} /> */}
            <div>
              {data.datoCmsArticle.articleContent.map(item => {
                const itemKey = Object.keys(item)[1]
                switch(itemKey){
                  case 'headingContent':
                    return <h2 key={item.id}>{item.headingContent}</h2>
                  case 'paragraphContent':
                    return <p key={item.id}>{item.paragraphContent}</p>
                  case 'imageData':
                    return <Image key={item.id} fixed={item.imageData.fixed} />
                  default:
                    return null;
                }
                  
              })}
            </div>
        </div>
    )
}

export default PostLayout;