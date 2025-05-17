import styles from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.Loader}>
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className={styles.Dot} />
      ))}
    </div>
  )
}
