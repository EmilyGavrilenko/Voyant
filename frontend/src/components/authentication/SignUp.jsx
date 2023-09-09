import { SignUp } from '@clerk/clerk-react';
import styles from './styles';

const SignUpPage = () => {
    return (
        <div style={styles.container}>
            <SignUp path='/sign-up' routing='path' signInUrl='/sign-in' />
        </div>
    );
};

export default SignUpPage;
