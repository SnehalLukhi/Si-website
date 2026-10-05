import { RevealGroup, RevealItem } from './Reveal'

const ARTICLE_RISE_PX = 40
const ARTICLE_STAGGER_S = 0.12

const ARTICLE_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: ARTICLE_RISE_PX },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
}

/* Blog article section: its ArticleItem descendants rise one by one when it scrolls into view */
export function ArticleSection(props) {
  return <RevealGroup as="section" stagger={ARTICLE_STAGGER_S} delayChildren={0} {...props} />
}

export function ArticleItem(props) {
  return <RevealItem variants={ARTICLE_ITEM_VARIANTS} {...props} />
}
