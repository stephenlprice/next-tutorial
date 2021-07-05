import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import Date from '../../components/date'

// files named inside brackets [] create dynamic routes, 
// Next will create individual HTML routes for each .md file
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      </article>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />      
    </Layout>
  )
}

// get dynamic paths using the id parameter defined in /lib/posts (.md file names)
export async function getStaticPaths() {
  const paths = getAllPostIds();

  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

// get post data for the corresponding .md file by id parameter
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}
