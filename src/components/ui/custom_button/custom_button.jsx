import styles from './custom_button.module.scss'

const CustomButton = (props)=>{
    const {children,type='primary'} = props

    return <button className={`${styles.custom_button} ${styles[type]}`}>
        {children}
    </button>
}

export default CustomButton;