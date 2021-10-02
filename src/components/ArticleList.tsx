import { css } from '@emotion/react'
import Link from 'next/link'
import React, { VFC } from 'react'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'
import Tag from './Tag'

type Props = {
  postsData: MetaData[]
}

const ArticleList: VFC<Props> = ({ postsData }) => {
  return (
    <div css={articlesContainer}>
      <section>
        <ul>
          {postsData.map(({ id, created, title, tags }) => (
            <li key={id} css={listItem}>
              <p css={createdAt}>{created}</p>
              <Link href={`/posts/${id}`}>
                <a css={titleText}>{title}</a>
              </Link>
              <div css={tagsContainer}>
                {tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <a css={link}>
                      <Tag tag={tag} />
                    </a>
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ArticleList

const articlesContainer = css`
  width: 100%;
`

const listItem = css`
  margin-bottom: 32px;
`

const createdAt = css`
  font-size: 1rem;
  color: ${colors.gray200};
  margin-bottom: 8px;
`

const titleText = css`
  font-size: 1.7rem;
  color: ${colors.blue400};
  text-decoration: none;
  cursor: pointer;
`

const tagsContainer = css`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`

const link = css`
  text-decoration: none;
  cursor: pointer;
`