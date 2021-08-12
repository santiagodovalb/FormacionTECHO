import { useHistory } from "react-router";

export default function useAuthorize(user, permitted) {

    const history = useHistory()

      if (user.full_name && (user.rolId === null || user.rolId !== permitted)) {
          history.push("/unauthorized")
      }
}