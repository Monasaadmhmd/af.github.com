import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostFooter from '../../components/PostFooter';
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../lib/api'
import styles from './post.module.css'

export default function Post({ post, latestPosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article className="container">
              <Head>
                <title>
                  {post.title} | TODO:site name
                </title>
              </Head>

              <header>
                <h1>{post.title}</h1>
                <time dateTime={post.date}>Posted on {post.date}</time>
              </header>
              <div
                className={styles.markdown}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <PostFooter post={post} latestPosts={latestPosts} />
            </article>
          </>
        )}
      </>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts()
  const post = getPostBySlug(params.slug)
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
      latestPosts: posts.slice(0, 3),
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
