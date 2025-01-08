import styles from '@/styles/home.module.css';
export default function EmptyComponent(){
    return (
        <div className={styles.emptyComponent}>
            <p>Sorry, No Data Available yet</p>
        </div>
    )
}