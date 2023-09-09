import { SignIn } from '@clerk/clerk-react';
import styles from './styles';

const SignInPage = () => {
    return (
        <div style={styles.container}>
            <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />
        </div>
    );
};

export default SignInPage;
