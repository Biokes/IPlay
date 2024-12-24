import styles from '@/styles/home.module.css'
import google from '@/public/googleImage.png'
import Image from 'next/image'
export default function SignIn(){
    return (
        <main className={styles.signIn}>
            <section>
                <p>continue with google</p>
                <Image src={google} width={20} height={20} alt={''}/>
            </section>
            <section>
                <p>continue with facebook</p>
                <Image src={google} width={20} height={20} alt={''}/>
            </section>
            <section>
                <p>continue with x</p>
                <Image src={google} width={20} height={20} alt={''}/>
            </section>
        </main>
    )
}
