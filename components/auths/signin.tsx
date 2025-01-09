import styles from '@/styles/home.module.css'
import Link from "next/link";


export default function SignIn(){
    return (
        <div className={'md:pt-[20px]'}>
            <Link href={'/'} className={styles.link}>
                Back
            </Link>
            <main className={styles.signIn}>
                <p style={{
                    fontWeight: '800',
                    fontSize: '35px',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontFamily: 'Dm sans'
                }}>IPlay Music</p>
                <p>Sign up/Sign In</p>
                <section className={'bg-red-600 hover:bg-red-700 '}>
                    <p>continue with google</p>
                </section>
                <section className={'bg-blue-500 hover:bg-blue-700'}>
                    <p>continue with Instagram</p>
                </section>
                <section className={'border-[1px] hover:text-white hover:bg-red-700'}>
                    <p>continue with spotify</p>
                </section>
            </main>
            <div className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Iplay</p>
                <p>Privacy Policy</p>
                <p>Terms of use</p>
            </div>

        </div>
    )
}
