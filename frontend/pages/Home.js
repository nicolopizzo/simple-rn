import AdminHome from './AdminHome';
import UserHome from './UserHome';

const selectRolePage = (role) => {
    switch (role) {
        case 'admin':
            return AdminHome
        default:
            return UserHome
    }
}

export default function Home({ navigation, route }) {
    const { user } = route.params;
    const { role } = user;

    let rolePage = selectRolePage(role);

    return rolePage({ navigation, route })
}