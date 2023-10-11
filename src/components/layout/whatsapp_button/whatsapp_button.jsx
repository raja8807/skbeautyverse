const { default: Link } = require("next/link")
const { WhatsappIcon } = require("react-share")
import styles from './whatsapp_button.module.scss'

const WhatsappButton = ()=>{
    return <Link href='/' className={styles.whatsapp_btn} >
        <WhatsappIcon round className={styles.icon}/>
    </Link>
}

export default WhatsappButton