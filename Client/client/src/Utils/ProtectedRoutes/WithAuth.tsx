import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../../Store";
import { UserType } from "../../Store/Enums/UserType";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
// import { useAuth } from '../hooks/useAuth';

export default function withAuth(WrappedComponent: any) {
  return function WithAuth(props: any) {
    const currentUser = useAppSelector(selectCurrentUser);
    const user = currentUser?.userType;
    const router = useRouter();

    useEffect(() => {
      if (user !== UserType.Admin) {
        router.push("/");
      }
    }, [user, router]);

    if (!currentUser || user !== UserType.Admin) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
}
