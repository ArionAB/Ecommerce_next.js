import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useAppSelector } from "../../Store";
import { UserType } from "../../Store/Enums/UserType";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";

export default function withAuth(WrappedComponent: any, adminOnly: boolean) {
  return function WithAuth(props: any) {
    const currentUser = useAppSelector(selectCurrentUser);
    const user = currentUser?.userType;
    const router = useRouter();

    useLayoutEffect(() => {
      if (adminOnly && user !== UserType.Admin) {
        router.push("/");
      }
      if (!adminOnly && !currentUser) {
        router.push("/");
      } else return;
      //eslint-disable-next-line
    }, [user, router]);

    if (adminOnly && user !== UserType.Admin) {
      return <p>Loading...</p>;
    }
    if (!adminOnly && user !== UserType.User) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
}
