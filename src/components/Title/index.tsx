import styles from './Title.module.scss'

type TitleProps = {
  subtitle: string
  title: string
  center?: boolean
  titleTag?: 'h1' | 'h2' | 'h3'
}

export const Title = ({ subtitle, title, center, titleTag = 'h2' }: TitleProps) => {
  const HeadingTag = titleTag
  const alignClass = center ? styles.center : styles.start

  return (
    <div>
      <p className={`${styles.subtitle} ${alignClass}`}>{subtitle}</p>
      <HeadingTag className={`${styles.title} ${alignClass}`}>{title}</HeadingTag>
    </div>
  )
}
