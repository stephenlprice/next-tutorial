import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

// files named inside brackets [] create dynamic routes, 
// Next will create individual HTML routes for each .md file
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br/>
      {postData.id}
      <br/>
      {postData.date}
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
  const postData = getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}
